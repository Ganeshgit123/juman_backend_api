import { BaseController } from "./base.controller";
import { authorizationMiddleware } from "../utils/security/authorization.middleware";
import { UserProcessor } from "../processors/user.processor";

export class UserController extends BaseController {
  private userProcessor = new UserProcessor();
  constructor(repository) {
    super(repository);
  }

  defineControllerRoutes(): void {
    this.router.post("/" + this.entityName + "/login", async (req, res) => this.evaluateAndSendResult(await this.userProcessor.verifyLogin(req.body), res));
    this.router.post("/" + this.entityName + "/register", async (req, res) => this.evaluateAndSendResult(await this.userProcessor.register(req.body), res));
    super.defineControllerRoutes();
  }
}