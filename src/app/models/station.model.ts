interface Location {
  id: number;
  country: string;
  city: string;
  address: string;
  zipCode: string;
}

interface Quantities {
  s: number;
  m: number;
  l: number;
}

export class Station {
  id: number;
  name: string;
  location: Location;
  quantities: Quantities;
  createdAt: Date;

  constructor(
    id: number,
    name: string,
    location: Location,
    quantities: Quantities,
    createdAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.quantities = quantities;
    this.createdAt = createdAt;
  }
}
