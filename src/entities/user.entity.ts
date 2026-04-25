import { JoinColumn, Entity, Column, OneToMany, ManyToOne, Generated } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity({ name: "user" })
export class User extends AbstractEntity {
    @Generated("uuid")
    @Column({ name: "id", primary: true, nullable: false })
    id: string;

    @Column("varchar", { name: "first_name", primary: false, nullable: false, length: 255 })
    firstName: string;
    
    @Column("varchar", { name: "last_name", primary: false, nullable: false, length: 255 })
    lastName: string;

    @Column("varchar", { name: "email", primary: false, nullable: false, length: 255 })
    email: string;

    @Column("varchar", { name: "password", primary: false, nullable: false, length: 255 })
    password: string;

    @Column("boolean", { name: "is_active", primary: false, default: true })
    isActive: boolean;
    
}
