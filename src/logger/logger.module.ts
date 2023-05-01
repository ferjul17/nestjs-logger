import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggerMiddleware } from "./logger.middleware";
import { utilities, WinstonModule } from "nest-winston";
import winston from "winston";
import { asyncLocalStorage } from "./async-local-storage";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { LoggerInterceptor } from "./logger.interceptor";
import { LoggerExceptionFilter } from "./logger.exception-filter";

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: "YYYY-MM-DDTHH:mm:ss.SSSZ" }),
            winston.format((info) => ({
              context: asyncLocalStorage.getStore()?.id,
              ...info,
            }))(),
            utilities.format.nestLike("API", {
              colors: true,
              prettyPrint: true,
            })
          ),
        }),
      ],
    }),
  ],
  providers: [
    LoggerMiddleware,
    LoggerExceptionFilter,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    { provide: APP_FILTER, useClass: LoggerExceptionFilter },
  ],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
