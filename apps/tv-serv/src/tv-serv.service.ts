import { Injectable, Logger } from '@nestjs/common';
import { v4 } from 'uuid';

@Injectable()
export class TvServService {
  logger: Logger;
  constructor(){
    this.logger = new Logger('Reports Service');
  }
  async uuidGenerate(): Promise<any> {
    try {
      const token = v4();
      return token;
    } catch (e) {
      console.log(e);
    }
  }  
}
