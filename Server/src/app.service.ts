import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'SuperSlice Backend API is running! 🚀';
  }
}
