const claims = [
  {
    id: 'MRPD-PropertyClaim',
    ped: {
      x: 455.00,
      y: -980.09,
      z: 30.69,
      h: 88.77
    },
    minZ: 29.69,
    maxZ: 31.09
  },
  {
    id: 'Jail-PropertyClaim',
    ped: {
      x: 1844.00,
      y: 2587.00,
      z: 45.00,
      h: 178.77
    },
    minZ: 44.00,
    maxZ: 46.00
  }
];

async function loadModel(model: string): Promise<void> {
  let tries = 0;
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      tries += 1;
      if (tries > 10) {
        clearInterval(interval);
        resolve();
      }

      if (HasModelLoaded(model)) {
        clearInterval(interval);
        resolve();
      }

      RequestModel(model);
    }, 100);
  });
}

async function getPropertyClaims() {
  for (let i = 0; i < claims.length; i += 1) {
    const claim = claims[i];
    loadModel('s_m_m_security_01').then(() => {
      const ped = CreatePed(4, GetHashKey('s_m_m_security_01'), claim.ped.x, claim.ped.y, claim.ped.z, claim.ped.h, false, false);
      SetBlockingOfNonTemporaryEvents(ped, true);
      SetPedDiesWhenInjured(ped, false);
      SetEntityHeading(ped, claim.ped.h);
      SetPedCanPlayAmbientAnims(ped, true);
      SetPedCanRagdollFromPlayerImpact(ped, false);
      SetEntityInvincible(ped, true);
      FreezeEntityPosition(ped, true);

      const qbTarget = (global.exports as any)['qb-target'];
      qbTarget.AddTargetModel('s_m_m_security_01', {
        options: [
          {
            type: 'client',
            event: 'qb-policejob:client:claimProperty',
            icon: 'fas fa-clipboard',
            label: 'Claim Property',
            canInteract: () => true
          }
        ],
        distance: 5.0
      });
    });
  }
}

AddEventHandler('qb-policejob:client:claimProperty', () => {
  const qbCore = (global.exports as any)['qb-core'];
  const QBCore: any = qbCore.GetCoreObject();
  QBCore.Functions.TriggerCallback('qb-policemanjob:server:isLockerEmpty', (isEmpty) => {
    if (isEmpty) {
      QBCore.Functions.Notify('The property locker is empty', 'error');
      return;
    }

    const oxInventory = (global.exports as any).ox_inventory;
    oxInventory.openInventory(
      'stash',
      {
        id: `locker-${QBCore.Functions.GetPlayerData().citizenid}`,
      }
    );
  });
});
on('QBCore:Client:OnPlayerLoaded', () => {
  const qbCore = (global.exports as any)['qb-core'];
  const QBCore: any = qbCore.GetCoreObject();
  QBCore.Functions.TriggerCallback('qb-policemanjob:server:loadLocker', () => { });
  getPropertyClaims();
});
