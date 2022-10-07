/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { AxiosInstance } from 'axios';
import { app } from './service';

class TerosService {
  private service: AxiosInstance;

  constructor() {
    this.service = app;
  }

  async postFile(file: any) {
    return app.post('/', { file });
  }

  async getData() {
    return app.get('/data');
  }

  async login(email: string, pass: string) {
    return app.post('/login', { email, password: pass });
  }
}

const terosService = new TerosService();
export { terosService };
