export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
  exp: Date;
  token: string;

  constructor(
    id = 0,
    firstName = '',
    lastName = '',
    email = '',
    username = '',
    role = '',
    exp = new Date(),
    token = ''
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.role = role;
    this.exp = exp;
    this.token = token;
  }
}
