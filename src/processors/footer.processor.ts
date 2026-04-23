import { Footer } from "../../src/entities/footer.entity";
import { DataTaskResult } from "../helpers/data-task-result";
import { FooterRepository } from "../repositories/footer.repository";

export class FooterProcessor {
    
    public async getFooterList(): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 200, isSuccess: false, payload: [], message: "" };
        try {
            const result: any = await FooterRepository.find();
            if(result?.length){
                dataTaskResult.payload = result;
            }
            dataTaskResult.isSuccess = true;
        } catch (error) {
            console.log(error);
        }
        return dataTaskResult;
    }
}