import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private readonly maxRetries = 10;
  private readonly retryDelayMs = 1000; // base delay, uses linear backoff

  async onModuleInit() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      this.logger.error(
        'DATABASE_URL 가 설정되어 있지 않습니다. Server/.env 에 올바른 값을 설정하세요.',
      );
      // DB 없이도 서버가 기동되도록 진행
      return;
    }

    await this.connectWithRetry();
  }

  private async connectWithRetry() {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        await this.$connect();
        this.logger.log('Prisma가 데이터베이스에 연결되었습니다.');
        return;
      } catch (err: any) {
        const code = err?.code || err?.errorCode;
        const message = err?.message || String(err);
        this.logger.warn(
          `Prisma 연결 시도 ${attempt}/${this.maxRetries} 실패${code ? ` [${code}]` : ''}: ${message}`,
        );
        if (attempt === this.maxRetries) {
          this.logger.error(
            '여러 번의 재시도 후에도 DB에 연결하지 못했습니다. 서버는 DB 없이 계속 실행됩니다.',
          );
          return;
        }
        // 간단한 선형 백오프
        await new Promise(res => setTimeout(res, this.retryDelayMs * attempt));
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
