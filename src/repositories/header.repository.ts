import { Header } from "../entities/header.entity";
import { AppDataSource } from "../data-source";

export const HeaderRepository = AppDataSource.getRepository(Header).extend({

});