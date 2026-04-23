import { BaseController } from "./base.controller";
import { authorizationMiddleware } from "../utils/security/authorization.middleware";
import { CareerProcessor } from "../processors/career.processor";

export class CareerController extends BaseController {
  private careerProcessor = new CareerProcessor();
  constructor(repository) {
    super(repository);
  }

  defineControllerRoutes(): void {
   // super.defineControllerRoutes();
    this.router.post("/" + this.entityName, authorizationMiddleware, async (req, res) => this.evaluateAndSendResult(await this.careerProcessor.careerRequest(req), res))
    this.router.post("/" + this.entityName + "/list", authorizationMiddleware, async (req, res) => this.evaluateAndSendResult(await this.careerProcessor.getCareerRequest(req.body), res))
    this.router.post("/site/" + this.entityName, async (req, res) => this.evaluateAndSendResult(await this.careerProcessor.careerRequest(req), res))
  }
}