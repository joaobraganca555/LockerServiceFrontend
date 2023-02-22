export interface Locker {
  id: number;
  stationId: number;
  status: 'FREE' | 'PENDING' | 'OCCUPIED' | 'OCCUPIED';
  size: {
    name: 'S' | 'M' | 'L';
    dayPrice: number;
    x: number;
    y: number;
    z: number;
  };
  pendingExpirationDate: Date | null;
  pendingUserId: number | null;
  isClosed: boolean;
}
