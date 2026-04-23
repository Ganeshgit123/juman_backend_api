import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

export const UserRepository = AppDataSource.getRepository(User).extend({
    async verifyLogin(email: string, password: string) {
        return await this.createQueryBuilder("user")
            .where("user.email = :email", {email})
            .andWhere("user.password = :password", {password})
            .getOne();
    }
});