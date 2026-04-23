import { Banners } from "../entities/banners.entity";
import { AppDataSource } from "../data-source";

export const BannersRepository = AppDataSource.getRepository(Banners).extend({

});