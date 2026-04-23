import { User } from "../../src/entities/user.entity";
import { DataTaskResult } from "../helpers/data-task-result";
import { UserRepository } from "../repositories/user.repository";
import { CryptoHelper } from "../utils/security/crypto.helper";
import { generateToken } from "../utils/security/authorization.middleware";
export class UserProcessor {

    public async verifyLogin(reqObj: any): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 500, payload: [], message: "" };
        try {
            const { email, password } = reqObj;
            const existingUser: User = await UserRepository.findOne({where: { email, isActive: true }})
            if(existingUser.id && CryptoHelper.verifyHash(password, existingUser.password)){
                delete existingUser.password;
                dataTaskResult.payload = await generateToken({userId: existingUser.id});
                dataTaskResult.code = 200;
            }else{
                dataTaskResult.message = "User is not verified.";
            }
            
        } catch (error) {
            console.log(error);
        }
        return dataTaskResult;
    }
    
    public async register(reqObj: User): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 500, payload: [], message: "" };
        try {

            reqObj.password = CryptoHelper.hash(reqObj.password);
            const userResult: User = await UserRepository.save(reqObj);
            if(userResult?.id){
                delete userResult.password;
                dataTaskResult.payload = userResult;
                dataTaskResult.code = 200;
            }
        } catch (error) {
            console.log(error);
        }
        return dataTaskResult;
    }
}