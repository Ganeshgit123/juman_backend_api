import {  Career } from "../entities/career.entity";
import { AppDataSource } from "../data-source";

export const CareerRepository = AppDataSource.getRepository(Career).extend({
    async getCareerRequest(data: any) {
        const query = this.createQueryBuilder("career")
            .andWhere("career.isActive = true")
            return await Promise.all([
                query.getCount(),
                query.limit(data.limit || 10).offset(data.skip).getMany()
            ])
    }
});