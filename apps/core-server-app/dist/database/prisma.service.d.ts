import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../../packages/generated/prisma';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly logger;
    onModuleInit(): Promise<void>;
}
