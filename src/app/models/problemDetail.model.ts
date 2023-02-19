export class ProblemDetail {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;

  constructor(type = '', title = '', status = 0, detail = '', instance = '') {
    this.type = type;
    this.title = title;
    this.status = status;
    this.detail = detail;
    this.instance = instance;
  }
}
