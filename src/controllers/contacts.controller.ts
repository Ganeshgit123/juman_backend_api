import { BaseController } from "./base.controller";
import { authorizationMiddleware } from "../utils/security/authorization.middleware";
import { ContactsProcessor } from "../processors/contacts.processor";

export class ContactsController extends BaseController {
  private contactsProcessor = new ContactsProcessor();
  constructor(repository) {
    super(repository);
  }

  defineControllerRoutes(): void {
    super.defineControllerRoutes();
    this.router.post("/" + this.entityName + "/list", authorizationMiddleware, async (req, res) => this.evaluateAndSendResult(await this.contactsProcessor.getContactRequest(req.body), res))
    this.router.post("/site/" + this.entityName, async (req, res) => this.evaluateAndSendResult(await this.contactsProcessor.createContactRequest(req.body), res))
  }
}