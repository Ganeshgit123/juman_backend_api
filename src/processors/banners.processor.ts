import { Banners } from "../entities/banners.entity";
import { DataTaskResult } from "../helpers/data-task-result";
import { BannersRepository } from "../repositories/banners.repository";
const path = require("path");

export class BannersProcessor {

    public async uploadBanners(req: any): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 500, payload: [], message: "" };
        try {

            if (!req.files || Object.keys(req.files).length === 0) {
                dataTaskResult.code = 400;
                dataTaskResult.message = "No files were uploaded";
                return dataTaskResult;
            }

            const header = req.body.header_id;
            const files = req.files?.banners?.length > 1 ? req.files?.banners : [req.files?.banners];
            const saveData = [];
            for(const file of files){
                const result = await file.mv(path.join(__dirname, "..", "public", "banners", file.name));
                if(result){
                    dataTaskResult.code = 500;
                    dataTaskResult.message = "Failed to store file";
                    return dataTaskResult;
                }
                const data = {
                  header, 
                  path: `banners/${file.name}`,
                  createdOn: new Date(),
                  additionalInfo: { fileName: file.name, mimetype: file.mimetype },
                  ...req.body,
                  seq: req.body?.seq || 0
                }
                saveData.push(data);
            }
            const result: Banners[] = await BannersRepository.save(saveData);
            if(result?.[0]?.id){
                dataTaskResult.code = 200;
                dataTaskResult.payload = result;
            }
        } catch (error) {
            console.log(error);
        }
        return dataTaskResult;
    }

    // Used for public API
    async getBannersForHeader(reqObj: any): Promise<any> {
        const dataTaskResult: DataTaskResult = { code: 500, isSuccess: false, payload: [], message: "" };
        try {
    
          const count = reqObj.count;
          const sort = reqObj.sort;
          const filter = reqObj.filter;
          const relations = reqObj.relations;
          const queryParameters: any = {};
          if (count > 0) {
            queryParameters.take = count;
          }
          if (sort != undefined) {
            queryParameters.order = sort;
          }
          if (filter != undefined) {
            queryParameters.where = filter;
          }
          if (relations != undefined) {
            queryParameters.relations = relations;
          }
          const entities = await BannersRepository.find(queryParameters);
    
          if (entities == undefined) {
            dataTaskResult.message = "Entity Not Found";
          }else{
            dataTaskResult.isSuccess = true;
            dataTaskResult.code = 200;
            dataTaskResult.payload = entities;
          }
        } catch (error) {
            dataTaskResult.message = "Failed to list";
        }
        return dataTaskResult;
      }
}