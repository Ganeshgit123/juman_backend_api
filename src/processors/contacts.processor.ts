import { ContactsRepository } from "../repositories/contacts.repository";
import { DataTaskResult } from "../helpers/data-task-result";
import { NodMailerService } from "../utils/mailer";

export class ContactsProcessor {
    public async getContactRequest(body: any): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 200, isSuccess: false, payload: [], message: "" };
        try {
            const result = await ContactsRepository.getContactRequest(body);
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

    public async createContactRequest(data: any): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 200, isSuccess: false, payload: [], message: "" };
        try {
            if(data){
                data.createdOn = new Date();
            }
            const result: any = await ContactsRepository.save(data);
            new NodMailerService().sendContactRequest(data, []);
            dataTaskResult.payload = result;
            dataTaskResult.isSuccess = true;
        } catch (error) {
            console.log(error);
        }
        return dataTaskResult;
    }
}