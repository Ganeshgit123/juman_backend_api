# Juman Bancked Node.js API Project
## Folder Structure of the project
* Project Folder
    + dist
    + node_modules
    + src
    + .env
    + .gitignore
    + CopyStaticAssets.js
    + package.json
    + tsconfig.json
    + tslint.json
## How to run project in local
1. To configure the DB connect, In `src/data-source.ts` file, update the DB configuration
2. To install the dependencies, In Project root directory, run below command
    > `npm i`
3. To run the project
    > `npm run start`

## Deploy project in Server
1. Update required configuration e.g., DB,PORT,etc.,
2. To build the project, execute below command in root directory
    > `npm run build`
3. In server, folder structure should like below
* Project Folder
    + dist
    + node_modules
    + .env
> Note: Before replacing dist folder in server, please make sure don't replace `dist/public` folder, We are storing static files for the respective environment in this folder. Please make sure before replacing it.

## Run project using Process Manager
* To run the project, run the below command
    >  `pm2 start dist/server.js --name <project_name> -max-memory-restart 750M && pm2 save`
* To restart the instance
    > `pm2 restart <project_name>`




