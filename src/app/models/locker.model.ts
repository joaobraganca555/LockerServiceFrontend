export class Locker {
  size = '';
  quantity = 0;
  stationId = 0;

  constructor(size: string, quantity: number, stationId: number) {
    this.size = size;
    this.quantity = quantity;
    this.stationId = stationId;
  }
}

// export class Locker {
//   id: number = 0;
// name: string = '';
// location: {
//   country: string;
//   city: string;
//   address: string;
//   zipCode: string;
// } = { country: '', city: '', address: '', zipCode: '' };
// lockers: {
//   id: number;
//   stationId: number;
//   status: string;
//   size: {
//     name: string;
//     dayPrice: number;
//     x: number;
//     y: number;
//     z: number;
//   };
//   pendingExpirationDate: any;
//   pendingUserId: any;
//   isClosed: boolean;
// }[] = [];

// constructor(data?: any) {
//   if (data) {
//     this.id = data.id || 0;
//     this.name = data.name || '';
//     this.location.country = data.location.country || '';
//     this.location.city = data.location.city || '';
//     this.location.address = data.location.address || '';
//     this.location.zipCode = data.location.zipCode || '';
//     this.lockers = data.lockers || [];
//   }
// }
// }
