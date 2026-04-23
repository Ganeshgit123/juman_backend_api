import * as _ from "lodash";
import { RoutePrivilege } from "./route-privilege";
import jwt = require("jsonwebtoken");
import CONFIG from "../../config";

export const authorizationMiddleware = async (req: any, res: any, next: any) => {
    if(!await verifyToken(req.headers)){
        return res.status(401).json({code: 401, isSuccess: false, message: "Unauthorized"});
    }
    const apiPath = req.route.path;
    const defaultEntites = ["user", "header", "banners", "sections", "contacts", "career", "footer"];
    const routes = [...RoutePrivilege.routes];
    _.forEach(defaultEntites, ele => {
        routes.push(...[{ path: `/${ele}` }, { path: `/${ele}/:id` }, { path: `/${ele}/query` }]);
    });
    const routesExists = _.filter(routes, ele => ele.path == apiPath);
    if (routesExists.length > 0) {
        next();
    } else {
        res.status(401).json({code: 401, isSuccess: false, message: "Unauthorized"});
    }
};

export const verifyToken = async (headers: any): Promise<boolean> => {
    let token: string = headers.authorization;
    console.log(token)
    if (token && token.startsWith("Bearer")) {
      token = token.slice("Bearer".length, token.length)?.trim();
    }

    try{
        return await jwt.verify(token, CONFIG.ENV_CONFIG.J_TOKEN_SALT, {subject: CONFIG.TOKEN_PAYLOAD.SUBJECT,
        algorithms: "HS256",
        issuer: CONFIG.TOKEN_PAYLOAD.ISSUER});
    }catch(error){
        console.log(error?.message, error);
    }
    return false;
}

export const generateToken = async(payload: any): Promise<string> => {
    const signOptions = {
        subject: CONFIG.TOKEN_PAYLOAD.SUBJECT,
        expiresIn: CONFIG.TOKEN_PAYLOAD.EXPIRY,
        algorithm: "HS256",
        issuer: CONFIG.TOKEN_PAYLOAD.ISSUER
        
      };

      return await jwt.sign(payload, CONFIG.ENV_CONFIG.J_TOKEN_SALT, signOptions);
}