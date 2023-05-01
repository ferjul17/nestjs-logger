import { NestFactory } from "@nestjs/core";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { CoreModule } from "./core.module";
import { AllExceptionFilter } from "./all.exception-filter";
import { LoggerExceptionFilter } from "./logger/logger.exception-filter";

async function bootstrap() {
  const app = await NestFactory.create(CoreModule, {
    bufferLogs: false,
  });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(
    app.get(AllExceptionFilter),
    app.get(LoggerExceptionFilter)
  );
  await app.listen(3000);
}

bootstrap().catch((err) => {
  throw err;
});
