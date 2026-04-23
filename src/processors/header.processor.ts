import { Header } from "../../src/entities/header.entity";
import { DataTaskResult } from "../helpers/data-task-result";
import { HeaderRepository } from "../repositories/header.repository";

export class HeaderProcessor {
    public async getHeaderList(): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 200, isSuccess: false, payload: [], message: "" };
        try {
            const result: any = await HeaderRepository.find();
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