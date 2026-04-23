import { BaseController } from "./base.controller";
import { authorizationMiddleware } from "../utils/security/authorization.middleware";
import { SectionsProcessor } from "../processors/sections.processor";

export class SectionsController extends BaseController {
  private sectionsProcessor = new SectionsProcessor();
  constructor(repository) {
    super(repository);
  }

  defineControllerRoutes(): void {
    super.defineControllerRoutes();
    this.router.post("/" + this.entityName + "/images/upload", authorizationMiddleware, async (req, res) => this.evaluateAndSendResult(await this.sectionsProcessor.uploadSectionImages(req), res));
    this.router.post("/" + this.entityName + "/images/list", authorizationMiddleware, async (req, res) => this.evaluateAndSendResult(await this.sectionsProcessor.getSectionImages(req?.body), res));
    this.router.put("/" + this.entityName + "/images/update", authorizationMiddleware, async (req, res) => this.evaluateAndSendResult(await this.sectionsProcessor.updateImageRecord(req?.body), res));
    // Used for public API
    this.router.post("/site/" + this.entityName + "/list", async (req, res) => this.evaluateAndSendResult(await this.sectionsProcessor.getSectionsForHeader(req.body), res));
    this.router.post("/site/" + this.entityName + "/images/list", async (req, res) => this.evaluateAndSendResult(await this.sectionsProcessor.getSectionImages(req?.body), res));
    this.router.post("/site/" + this.entityName + "/data", async (req, res) => this.evaluateAndSendResult(await this.sectionsProcessor.getSectionListWithPagination(req?.body), res));
  }
}