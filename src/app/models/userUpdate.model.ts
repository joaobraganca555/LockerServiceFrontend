export class UserUpdate {
  firstName: string;
  lastName: string;
  email: string;
  username: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
  }
}
