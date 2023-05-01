import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter<unknown> {
  public override catch(exception: unknown, host: ArgumentsHost) {
    console.log("Send to sentry?");
    super.catch(exception, host);
  }
}
