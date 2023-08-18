import Locker from './locker';

const lockers = [] as Locker[];

function getLocker(playerId: string) {
  return lockers.find((l) => l.getOwner() === playerId);
}

// If the player already has a locker, return it. Otherwise, create a new one.
function createLocker(playerId: string) {
  let locker = getLocker(playerId);
  if (!locker) {
    locker = new Locker(`locker-${playerId}`, `Locker - ${playerId}`, 50, 10000, playerId);
    lockers.push(locker);
    // Register the locker with ox_inventory
    exports.ox_inventory.RegisterStash(
      locker.getId(),
      locker.getLabel(),
      locker.getSlots(),
      locker.getWeight(),
      locker.getOwner()
    );
  }
  return locker;
}

const qbCore = (global.exports as any)['qb-core'];
const QBCore = qbCore.GetCoreObject();

QBCore.Functions.CreateCallback('qb-policemanjob:server:loadLocker', (src: number, cb: Function) => {
  const playerId = QBCore.Functions.GetPlayer(src).PlayerData.citizenid;
  const locker = createLocker(playerId);
  cb(locker);
});

QBCore.Functions.CreateCallback('qb-policemanjob:server:isLockerEmpty', (src: number, cb: Function) => {
  const playerId = QBCore.Functions.GetPlayer(src).PlayerData.citizenid;
  const locker = getLocker(playerId);
  if (!locker) {
    cb(true);
    return;
  }
  const inv = exports.ox_inventory.GetInventory(locker.getId());
  cb(inv.items === undefined || inv.items.length === 0);
});

QBCore.Commands.Add(
  'openLocker',
  'Open the police locker for a player',
  [
    {
      name: 'playerId',
      help: 'The player id or CID of the player to open the locker for',
    },
  ],
  true,
  (src: number, args: string[]) => {
    const playerId = args[0];
    const sender = QBCore.Functions.GetPlayer(src);

    const canOpen = sender.PlayerData.job.name === 'police';

    if (!canOpen) {
      TriggerClientEvent('chat:addMessage', src, {
        args: ['Police Locker', 'You are not a police officer']
      });
      return;
    }

    let isCid = false;
    // regex is 3 letters, 5 numbers
    if (playerId.match(/^[a-zA-Z]{3}[0-9]{5}$/)) {
      isCid = true;
    }

    if (!isCid) { // We are trying to get the locker for an online player.
      const targetPlayer = QBCore.Functions.GetPlayer(parseInt(playerId, 10));

      if (!targetPlayer) {
        TriggerClientEvent('chat:addMessage', src, {
          args: ['Police Locker', 'Player not found']
        });
        return;
      }

      exports.ox_inventory.forceOpenInventory(src, 'stash', `locker-${targetPlayer.PlayerData.citizenid}`);
      return;
    }

    // We are trying to get the locker for an offline player.
    const locker = createLocker(playerId);
    exports.ox_inventory.forceOpenInventory(src, 'stash', locker.getId());
  },
  ''
);
