import { Contacts } from "../entities/contacts.entity";
import { AppDataSource } from "../data-source";

export const ContactsRepository = AppDataSource.getRepository(Contacts).extend({
    async getContactRequest(data: any) {
        const query = this.createQueryBuilder("contacts")
            .andWhere("contacts.isActive = true")
            return await Promise.all([
                query.getCount(),
                query.limit(data.limit || 10).offset(data.skip).getMany()
            ])
    }
});