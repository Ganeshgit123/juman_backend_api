import { Footer } from "../entities/footer.entity";
import { AppDataSource } from "../data-source";

export const FooterRepository = AppDataSource.getRepository(Footer).extend({
    
});