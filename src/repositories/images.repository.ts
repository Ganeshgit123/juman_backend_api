import { Images } from "../entities/images.entity";
import { AppDataSource } from "../data-source";

export const ImagesRepository = AppDataSource.getRepository(Images).extend({
    async getSectionImages(sectionIds: string[]): Promise<any> {
        return await this.createQueryBuilder("images")
            .select(['images.id as "id"', 'images.path as "path"', 'images.seq as seq', 'section.id as "sectionId"', 'images.isActive as "isActive"'])
            .innerJoin("images.section", "section", "section.isActive = :isActive", {isActive: true})
            .andWhere("section.id IN (:...sectionIds)", {sectionIds})
            .orderBy("images.seq", "ASC")
            .getRawMany();
    }

});