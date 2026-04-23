import { JoinColumn, Entity, Column, OneToMany, ManyToOne, Generated } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity({ name: "career" })
export class Career extends AbstractEntity {
    @Generated("uuid")
    @Column({ name: "id", primary: true, nullable: false })
    id: string;

    @Column("character varying", { name: "name", primary: false, nullable: false })
    name: string;

    @Column("character varying", { name: "mobile_number", primary: false, nullable: false })
    mobileNumber: string;
    
    @Column("character varying", { name: "email", primary: false, nullable: false })
    email: string;

    @Column("text", { name: "department", primary: false, nullable: true })
    department: string;

    @Column("character varying", { name: "attachment", primary: false, nullable: false })
    attachment: string;

    @Column("boolean", { name: "is_active", primary: false, default: true })
    isActive: boolean;

    @Column("timestamp without time zone", { name: "created_on", nullable: true })
    createdOn?: Date;
}