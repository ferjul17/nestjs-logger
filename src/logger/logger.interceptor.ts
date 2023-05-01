import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Response } from "express";

export class LoggerInterceptor implements NestInterceptor {
  public constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>
  ): Observable<unknown> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();
    return next.handle().pipe(
      tap((body) => {
        const res = {
          statusCode: response.statusCode,
          headers: response.getHeaders(),
          body,
        };
        this.logger.info(`→ ${res.statusCode} ${body}`, res);
      })
    );
  }
}
