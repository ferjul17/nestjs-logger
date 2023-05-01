import { Controller, Get } from "@nestjs/common";

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
}
