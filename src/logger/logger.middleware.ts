import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { asyncLocalStorage } from "./async-local-storage";
import { v4 as uuid } from "uuid";
import { pick } from "lodash";
import { obfuscateHeaders } from "./obfuscate-headers";
import rawBody from "raw-body";

const MAX_PAYLOAD_LENGTH = 1_024 * 10;

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}
  // @ts-ignore
  use(request: Request, res: Response, next: Function) {
    return asyncLocalStorage.run({ id: uuid() }, async () => {
      const res = {
        ...pick(request, [
          "method",
          "body",
          "httpVersion",
          "ips",
          "ip",
          "protocol",
          "originalUrl",
        ]),
        headers: obfuscateHeaders(request.headers),
        rawBody: await rawBody(request, { limit: MAX_PAYLOAD_LENGTH }).then(
          String,
          String
        ),
      };
      this.logger.info(`← ${res.method} ${res.originalUrl}`, res);
      next();
    });
  }
}
