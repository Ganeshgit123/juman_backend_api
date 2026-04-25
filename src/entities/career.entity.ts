import { JoinColumn, Entity, Column, OneToMany, ManyToOne, Generated } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity({ name: "career" })
export class Career extends AbstractEntity {
    @Generated("uuid")
    @Column({ name: "id", primary: true, nullable: false })
    id: string;

    @Column("varchar", { name: "name", primary: false, nullable: false, length: 255 })
    name: string;

    @Column("varchar", { name: "mobile_number", primary: false, nullable: false, length: 255 })
    mobileNumber: string;

    @Column("varchar", { name: "email", primary: false, nullable: false, length: 255 })
    email: string;

    @Column("text", { name: "department", primary: false, nullable: true })
    department: string;

    @Column("varchar", { name: "attachment", primary: false, nullable: false, length: 255 })
    attachment: string;

    @Column("boolean", { name: "is_active", primary: false, default: true })
    isActive: boolean;

    @Column("timestamp", { name: "created_on", nullable: true })
    createdOn?: Date;
}