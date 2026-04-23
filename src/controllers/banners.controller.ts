import { BaseController } from "./base.controller";
import { authorizationMiddleware } from "../utils/security/authorization.middleware";
import { BannersProcessor } from "../processors/banners.processor";

export class BannersController extends BaseController {
  private bannersProcessor = new BannersProcessor();
  constructor(repository) {
    super(repository);
  }

  defineControllerRoutes(): void {
    this.router.post("/" + this.entityName + "/upload", authorizationMiddleware, async (req, res) => this.evaluateAndSendResult(await this.bannersProcessor.uploadBanners(req), res))
    this.router.post("/site/" + this.entityName + "/list", async (req, res) => this.evaluateAndSendResult(await this.bannersProcessor.getBannersForHeader(req.body), res));
    super.defineControllerRoutes();
  }
}