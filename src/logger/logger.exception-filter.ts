import { ArgumentsHost, Inject } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Response } from "express";
import { BaseExceptionFilter } from "@nestjs/core";
//
// export class LoggerExceptionFilter implements ExceptionFilter {
//   public constructor(
//     @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
//   ) {}
//
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const error =
//       exception instanceof Error ? exception : new Error(String(exception));
//     this.logger.error(`➲ ${response.statusCode}`, error);
//     throw exception;
//   }
// }
export class LoggerExceptionFilter extends BaseExceptionFilter {
  public constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {
    super();
  }

  override catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error =
      exception instanceof Error ? exception : new Error(String(exception));
    this.logger.error(`➲ ${response.statusCode}`, error);
    super.catch(exception, host);
  }
}
