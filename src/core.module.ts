import { Module } from "@nestjs/common";
import { AppModule } from "./app/app.module";
import { LoggerModule } from "./logger/logger.module";
import { AllExceptionFilter } from "./all.exception-filter";

@Module({
  imports: [AppModule, LoggerModule],
  providers: [AllExceptionFilter],
})
export class CoreModule {}
