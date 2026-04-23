import { Sections } from "../entities/sections.entity";
import { AppDataSource } from "../data-source";

export const SectionsRepository = AppDataSource.getRepository(Sections).extend({
    async getSectionListWithPagination(data: any) {
        const query = this.createQueryBuilder("sections")
            .andWhere("sections.isActive = true")
            return await Promise.all([
                query.getCount(),
                query.limit(data.limit || 10).offset(data.skip).getMany()
            ])
    }
});