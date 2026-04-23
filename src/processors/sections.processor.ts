import { Images } from "../../src/entities/images.entity";
import { Sections } from "../../src/entities/sections.entity";
import { DataTaskResult } from "../helpers/data-task-result";
import { SectionsRepository } from "../repositories/sections.repository";
import { ImagesRepository } from "../repositories/images.repository";
const path = require("path");

export class SectionsProcessor {

    public async uploadSectionImages(req: any): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 500, payload: [], message: "" };
        try {

            if (!req.files || Object.keys(req.files).length === 0) {
                dataTaskResult.code = 400;
                dataTaskResult.message = "No files were uploaded";
                return dataTaskResult;
            }

            const section = req.body.section_id;
            const imageIds = req.body?.ids && req.body?.ids?.length ? JSON.parse(req.body.ids) : [];
            const imageSeqs = req.body?.seqs && req.body?.seqs?.length ? JSON.parse(req.body.seqs) : [];

            const files = req.files?.images?.length > 1 ? req.files?.images : [req.files?.images];
            const saveData = [];
            let i = 0;
            for(const file of files){
                const result = await file.mv(path.join(__dirname, "..", "public", "images", file.name));
                if(result){
                    dataTaskResult.code = 500;
                    dataTaskResult.message = "Failed to store file";
                    return dataTaskResult;
                }
                const saveReadyData = {
                    section, 
                    path: `images/${file.name}`,
                    additionalInfo: { fileName: file.name, mimetype: file.mimetype },
                    ...req.body,
                    seq: imageSeqs?.[i] || 0 
                }
                if(imageIds?.length && imageIds?.[i]){
                    saveReadyData.id = imageIds[i];
                    saveReadyData.modifiedOn = new Date();
                }else{
                    saveReadyData.createdOn = new Date();
                }
                saveData.push(saveReadyData);
                i++;
            }
            const result: Images[] = await ImagesRepository.save(saveData);
            if(result?.[0]?.id){
                dataTaskResult.code = 200;
                dataTaskResult.payload = result;
            }
        } catch (error) {
            console.log(error);
        }
        return dataTaskResult;
    }

    public async getSectionImages(body: any): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 200, isSuccess: false, payload: [], message: "" };
        try {
            const result: any = await ImagesRepository.getSectionImages(body.sectionIds);
            if(result?.length){
                dataTaskResult.payload = result;
            }
            dataTaskResult.isSuccess = true;
        } catch (error) {
            console.log(error);
        }
        return dataTaskResult;
    }

    // Used for public API
    async getSectionsForHeader(reqObj: any): Promise<any> {
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
          const entities = await SectionsRepository.find(queryParameters);
    
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

      // Used for public API
      public async getSectionListWithPagination(body: any): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 200, isSuccess: false, payload: [], message: "" };
        try {
            const result = await SectionsRepository.getSectionListWithPagination(body);
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

    public async updateImageRecord(body: any): Promise<DataTaskResult> {
        const dataTaskResult: DataTaskResult = { code: 200, isSuccess: false, payload: [], message: "" };
        try {
            if(!body.id){
                dataTaskResult.code = 400;
                dataTaskResult.message = "Id is required";
                return dataTaskResult;
            }else{
                body.modifiedOn = new Date();
            }
            const result: any = await ImagesRepository.save(body);
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