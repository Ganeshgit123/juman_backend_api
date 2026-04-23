import { UserRepository } from "../repositories/user.repository";
import { UserController } from "./user.controller";
import { HeaderController } from "./header.controller";
import { HeaderRepository } from "../repositories/header.repository";
import { BannersController } from "./banners.controller";
import { BannersRepository } from "../repositories/banners.repository";
import { SectionsController } from "./sections.controller";
import { SectionsRepository } from "../repositories/sections.repository";
import { ContactsRepository } from "../repositories/contacts.repository";
import { ContactsController } from "./contacts.controller";
import { CareerController } from "./career.controller";
import { CareerRepository } from "../repositories/career.repository";
import { FooterController } from "./footer.controller";
import { FooterRepository } from "../repositories/footer.repository";

export class ControllerFactory {
    getControllers(): Array<any> {
        return [
            new UserController(UserRepository),
            new HeaderController(HeaderRepository),
            new BannersController(BannersRepository),
            new SectionsController(SectionsRepository),
            new ContactsController(ContactsRepository),
            new CareerController(CareerRepository),
            new FooterController(FooterRepository)
        ];
    }
}