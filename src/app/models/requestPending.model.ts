export class RequestPending {
  originStationId: number;
  destinationStationId: number;
  size: string;

  constructor(
    originStationId: number,
    destinationStationId: number,
    size: string
  ) {
    this.originStationId = originStationId;
    this.destinationStationId = destinationStationId;
    this.size = size;
  }
}
