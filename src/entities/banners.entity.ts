import { JoinColumn, Entity, Column, OneToMany, ManyToOne, Generated } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Header } from "./header.entity";

@Entity({ name: "banners" })
export class Banners extends AbstractEntity {
    @Generated("uuid")
    @Column({ name: "id", primary: true, nullable: false })
    id: string;

    @Column("integer", { name: "seq", primary: false, nullable: true })
    seq: number;
    
    @Column("character varying", { name: "er_title", primary: false, nullable: true })
    erTitle: string;
    
    @Column("character varying", { name: "ar_title", primary: false, nullable: true })
    arTitle: string;
    
    @Column("text", { name: "er_content", primary: false, nullable: true })
    erContent: string;
    
    @Column("text", { name: "ar_content", primary: false, nullable: true })
    arContent: string;

    @Column("character varying", { name: "path", primary: false, nullable: true })
    path: string;

    @Column("boolean", { name: "is_active", primary: false, default: true })
    isActive: boolean;

    @Column("timestamp without time zone", { name: "created_on", nullable: true })
    createdOn?: Date;

    @Column("timestamp without time zone", { name: "modified_on", nullable: true })
    modifiedOn?: Date;

    @Column("jsonb", { name: "additional_info", nullable: true })
    additionalInfo?: JSON;

    @ManyToOne(() => Header, (header) => header.banners)
    @JoinColumn([{ name: "header_id", referencedColumnName: "id" }])
    public header: Header;


}

