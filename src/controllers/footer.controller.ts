import { BaseController } from "./base.controller";
import { authorizationMiddleware } from "../utils/security/authorization.middleware";
import { FooterProcessor } from "../processors/footer.processor";

export class FooterController extends BaseController {
  private footerProcessor = new FooterProcessor();
  constructor(repository) {
    super(repository);
  }

  defineControllerRoutes(): void {
    super.defineControllerRoutes();
    this.router.get("/site/" + this.entityName + "/list", async (req, res) => this.evaluateAndSendResult(await this.footerProcessor.getFooterList(), res));
  }
}