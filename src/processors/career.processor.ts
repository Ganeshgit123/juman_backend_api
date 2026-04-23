import { CareerRepository } from "../repositories/career.repository";
import { DataTaskResult } from "../helpers/data-task-result";
import { Career } from "../entities/career.entity";
import { NodMailerService } from "../utils/mailer";
const path = require("path");

export class CareerProcessor {
    public async careerRequest(req: any): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 500, payload: [], message: "" };
        try {

            if (!req.files || Object.keys(req.files).length === 0) {
                dataTaskResult.code = 400;
                dataTaskResult.message = "No files were uploaded";
                return dataTaskResult;
            }

            const file = req.files?.resume;
            const fileSave = await file.mv(path.join(__dirname, "..", "public", "resumes", file.name));
            if(fileSave){
                dataTaskResult.code = 500;
                dataTaskResult.message = "Failed to store file";
                return dataTaskResult;
            }
                const saveData = {
                    attachment: `resumes/${file.name}`,
                    createdOn: new Date(),
                    ...req.body,
                }
            const result: Career = await CareerRepository.save(saveData);
            if(result?.id){
                dataTaskResult.code = 200;
                dataTaskResult.payload = result;
                new NodMailerService().sendCareerRequest(req.body, [{filename: file.name, content: Buffer.from(file.data, 'utf-8')}])
            }
        } catch (error) {
            console.log(error);
        }
        return dataTaskResult;
    }

    public async getCareerRequest(body: any): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 200, isSuccess: false, payload: [], message: "" };
        try {
            const result = await CareerRepository.getCareerRequest(body);
            if(result?.[0] > 0){
                dataTaskResult.payload = {
                    totalCount: result[0],
                    data: result[1]
                }
            }
            dataTaskResult.isSuccess = true;
        } catch (error) {
            console.log(error);
        }
        return dataTaskResult;
    }
}