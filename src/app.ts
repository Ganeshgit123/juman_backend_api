/**
 * Module dependencies.
 */
import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as bodyParser from "body-parser";
import * as errorHandler from "errorhandler";
import * as path from "path";
const cors = require("cors");
import "reflect-metadata";
const _ = require("underscore");
import { ControllerFactory } from "./controllers/controller-factory.controller";
import { AppDataSource } from "./data-source";
const fileUpload = require("express-fileupload");
/**
 * Controllers (route handlers).
 */
/**
 * Create Express server.
 */
export const app = express();
AppDataSource.initialize()
    .then(() => {
  console.log("DB Connected");
  app.use(compression());
  app.use(fileUpload({createParentPath: true}));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  // dotenv.config({ path: "./.env.test" });
  app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));

  const whitelist = ["http://localhost:4200", "https://site.webdev.juman-bm.com"];
  const corsOptions = {
    origin: function (origin: any, callback: any) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(undefined, true);
      }
      else if (origin === undefined) {
        callback(undefined, true);
      }
      else if (origin === "null") {
        callback(undefined, true);
      }
      else {
        callback(new Error(origin + " Not allowed by CORS"));
      }
    }
  };
  app.use(cors(corsOptions));
  const controllers = new ControllerFactory().getControllers();
  controllers.forEach(controller => {
    app.use(controller.getRouter())
  });

  app.get("/api", function (req, res) {
    res.send("Service active");
  });
  /**
   *  * Error Handler. Provides full stack - remove for production
   */
  app.use(errorHandler());
}).catch((error) => console.log(error));