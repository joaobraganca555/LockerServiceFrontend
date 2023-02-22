export class Order {
  receiverEmail: string;
  originLockerId: number;
  destinationLockerId: number;
  collectDays: number;

  constructor(
    receiverEmail: string,
    originLockerId: number,
    destinationLockerId: number,
    collectorDays: number
  ) {
    this.receiverEmail = receiverEmail;
    this.originLockerId = originLockerId;
    this.destinationLockerId = destinationLockerId;
    this.collectDays = collectorDays;
  }
}
