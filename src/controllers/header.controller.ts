import { BaseController } from "./base.controller";
import { authorizationMiddleware } from "../utils/security/authorization.middleware";
import { HeaderProcessor } from "../processors/header.processor";

export class HeaderController extends BaseController {
  private headerProcessor = new HeaderProcessor();
  constructor(repository) {
    super(repository);
  }

  defineControllerRoutes(): void {
    super.defineControllerRoutes();
    this.router.get("/site/" + this.entityName + "/list", async (req, res) => this.evaluateAndSendResult(await this.headerProcessor.getHeaderList(), res));
  }
}