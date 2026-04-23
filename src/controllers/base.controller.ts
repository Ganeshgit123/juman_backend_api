import { Request, Response, Router } from "express";
import { authorizationMiddleware } from "../utils/security/authorization.middleware";
import { DataTaskResult } from "../helpers/data-task-result";

export class BaseController {

  protected repository;
  protected entityName: string;
  protected router: Router;
  constructor(repository: any) {
    this.router = Router();
    this.repository = repository;
    this.entityName = this.repository.target.name.toLowerCase();
  }
  getRouter() {
    this.defineControllerRoutes();
    return this.router; 
  }
  defineControllerRoutes() {
    this.router.get("/" + this.entityName + "/:id", authorizationMiddleware, async (req, res) => await this.get(req, res));
    this.router.post("/" + this.entityName + "/query", authorizationMiddleware, async (req, res) => await this.query(req, res));
    this.router.put("/" + this.entityName + "/:id", authorizationMiddleware, async (req, res) => await this.update(req, res));
    this.router.post(`/${this.entityName}`, authorizationMiddleware, async (req, res) => await this.post(req, res));
    this.router.delete("/" + this.entityName + "/:id", authorizationMiddleware, async (req, res) => await this.delete(req, res));
  }

  async get(req: Request, res: Response): Promise<any> {
    try {
      const entity = await this.repository.findOne({ where: { id: req.params.id } });
      if (entity == undefined) {
        this.setError(404, "Entity Not Found", res);
        return;
      }
      this.setSuccess(200, entity, res);
    } catch (error) {
      this.setError(500, error, res);
    }
  }

  async query(req: Request, res: Response): Promise<any> {
    try {

      const count = req.body.count;
      const sort = req.body.sort;
      const filter = req.body.filter;
      const relations = req.body.relations;
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
      const entities = await this.repository.find(queryParameters);

      if (entities == undefined) {
        this.setError(404, "Entity Not Found", res);
      }
      this.setSuccess(200, entities, res);
    } catch (error) {
      this.setError(500, error, res);
    }
  }

  async post(req: Request, res: Response): Promise<any> {
    try {
      const entity = req.body;
      let result;
      if(Array.isArray(entity.arrObj) && entity.arrObj?.length){
        const saveData: any[] = entity.arrObj.map((obj: any) => {
          return {...obj, ...{createdOn: new Date()}}
        });
        result = await this.repository.save(saveData);
      }else{
        const entityObject = Object.assign(entity);
        if(!entityObject?.id){
          entity.modifiedOn = new Date();
        }else{
          entityObject.createdOn = new Date();
        }
        result = await this.repository.save(entityObject);
      }
      
      this.setSuccess(200, result, res);
    } catch (error) {
      this.setError(500, error, res);

    }
  }
  async delete(req: Request, res: Response): Promise<any> {
    try {
      const entity = await this.repository.findOne({ where: { id: req.params.id } });
      if (entity == undefined) {
        this.setError(404, "Entity Not Found", res);
        return;
      }
      entity.isActive = false;
      entity.modifiedOn = new Date();
      const result = await this.repository.save(entity);
      this.setSuccess(200, undefined, res);
    } catch (error) {
      this.setError(500, error, res);
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const entity = req.body;
      entity.modifiedOn = new Date();
      await this.repository.update(this.repository.target.name, req.params.id, entity);
      this.setSuccess(200, entity, res);
    } catch (error) {
      this.setError(500, error, res);
    }
  }

  setError(code: any, errorDescription: any, res: Response) {
    console.log(errorDescription);
    res.status(code).json({ isSuccess: false, error: "Request Failed" });
  }
  setSuccess(code: any, payload: any, res: Response) {
    res.status(code).json({ isSuccess: true, payload: payload });
  }
  
  evaluateAndSendResult(dataTaskResult: DataTaskResult, response: Response) {
    // if(dataTaskResult.isSuccess) {
      response.status(dataTaskResult.code).json(dataTaskResult);
    // } else {
    //   response.status(500).json(dataTaskResult);
    // }
  }
}