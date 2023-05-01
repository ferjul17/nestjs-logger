import { Controller, Get, Post, RawBodyRequest, Req } from "@nestjs/common";
import { Request } from "express";
import { pick } from "lodash";

@Controller()
export class AppController {
  @Get("/")
  public hello() {
    return ["hello"];
  }
  @Get("/fail")
  public fail() {
    throw new Error("something went wrong");
  }
  @Post("/raw")
  public raw(@Req() req: RawBodyRequest<Request>) {
    console.log("RAW", pick(req, "rawBody", "body"));
  }
}
