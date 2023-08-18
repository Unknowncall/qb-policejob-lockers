export default class Locker {
  private id: string;
  private label: string;
  private slots: number;
  private weight: number;
  private owner: string;

  constructor(id: string, label: string, slots: number, weight: number, owner: string) {
    this.id = id;
    this.label = label;
    this.slots = slots;
    this.weight = weight;
    this.owner = owner;
  }

  public getId(): string {
    return this.id;
  }

  public getLabel(): string {
    return this.label;
  }

  public getSlots(): number {
    return this.slots;
  }

  public getWeight(): number {
    return this.weight;
  }

  public getOwner(): string {
    return this.owner;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public setLabel(label: string): void {
    this.label = label;
  }

  public setSlots(slots: number): void {
    this.slots = slots;
  }

  public setWeight(weight: number): void {
    this.weight = weight;
  }

  public setOwner(owner: string): void {
    this.owner = owner;
  }

  public toString(): string {
    return `Locker: ${this.id} | Label: ${this.label} | Slots: ${this.slots} | Weight: ${this.weight} | Owner: ${this.owner}`;
  }
}
