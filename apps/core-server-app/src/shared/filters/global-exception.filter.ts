/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: any = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (process.env.NODE_ENV === 'development') {
      responseBody.message =
        exception instanceof Error ? exception.message : 'Unknown error';
      if (exception instanceof Error) {
        responseBody.stack = exception.stack;
      }
    }

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
