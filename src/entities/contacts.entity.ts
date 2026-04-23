import { JoinColumn, Entity, Column, OneToMany, ManyToOne, Generated } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity({ name: "contacts" })
export class Contacts extends AbstractEntity {
    @Generated("uuid")
    @Column({ name: "id", primary: true, nullable: false })
    id: string;

    @Column("character varying", { name: "name", primary: false, nullable: false })
    name: string;

    @Column("character varying", { name: "mobile_number", primary: false, nullable: false })
    mobileNumber: string;
    
    @Column("character varying", { name: "email", primary: false, nullable: false })
    email: string;

    @Column("text", { name: "message", primary: false, nullable: true })
    message: string;    

    @Column("boolean", { name: "is_active", primary: false, default: true })
    isActive: boolean;

    @Column("timestamp without time zone", { name: "created_on", nullable: true })
    createdOn?: Date;
}