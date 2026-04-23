import { JoinColumn, Entity, Column, OneToMany, ManyToOne, Generated } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity({ name: "user" })
export class User extends AbstractEntity {
    @Generated("uuid")
    @Column({ name: "id", primary: true, nullable: false })
    id: string;

    @Column("character varying", { name: "first_name", primary: false, nullable: false })
    firstName: string;
    
    @Column("character varying", { name: "last_name", primary: false, nullable: false })
    lastName: string;

    @Column("character varying", { name: "email", primary: false, nullable: false })
    email: string;

    @Column("character varying", { name: "password", primary: false, nullable: false })
    password: string;

    @Column("boolean", { name: "is_active", primary: false, default: true })
    isActive: boolean;
    
}
