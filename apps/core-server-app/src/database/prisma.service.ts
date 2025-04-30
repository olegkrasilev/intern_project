import { Injectable, Logger } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../../packages/generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to the database');
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error('Failed to connect to the database', error.message);

        throw new Error(`Failed connection to database: ${error.message}`);
      }
    }
  }
}
