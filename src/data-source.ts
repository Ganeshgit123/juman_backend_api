import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";
import { Header } from "./entities/header.entity";
import { Banners } from "./entities/banners.entity";
import { Sections } from "./entities/sections.entity";
import { Images } from "./entities/images.entity";
import { Contacts } from "./entities/contacts.entity";
import { Career } from "./entities/career.entity";
import { Footer } from "./entities/footer.entity";

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "juman-website-db.cwcphwli2rod.me-south-1.rds.amazonaws.com",
//     port: 5432,
//     username: "jumandev",
//     password: "oE1PrM2j58U2vn64HcK1RFgi",
//     database: "juman_dev_db",
//     synchronize: false,
//     logging: false, 
//     entities: [User, Header, Banners, Sections, Images, Contacts, Career, Footer],
//     migrations: [],
//     subscribers: [],
// });



// local (configurable via environment variables)
// prefer mysql2 client which supports modern auth plugins
const DB_TYPE = process.env.DB_TYPE || "mysql";;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT || "3306", 10);
const DB_USER = process.env.DB_USER || "juman";
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME || "juman";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "juman",
    password: "Juman@123",
    database: "juman",
    synchronize: false,
    logging: false,
    entities: [User, Header, Banners, Sections, Images, Contacts, Career, Footer],
    migrations: [],
    subscribers: [],
});

export { AppDataSource };