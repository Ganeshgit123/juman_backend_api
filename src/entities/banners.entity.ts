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

    @Column("varchar", { name: "er_title", primary: false, nullable: true, length: 255 })
    erTitle: string;

    @Column("varchar", { name: "ar_title", primary: false, nullable: true, length: 255 })
    arTitle: string;

    @Column("text", { name: "er_content", primary: false, nullable: true })
    erContent: string;

    @Column("text", { name: "ar_content", primary: false, nullable: true })
    arContent: string;

    @Column("varchar", { name: "path", primary: false, nullable: true, length: 255 })
    path: string;

    @Column("tinyint", { name: "is_active", default: 1 })
    isActive: number;

    @Column("timestamp", { name: "created_on", nullable: true })
    createdOn?: Date;

    @Column("timestamp", { name: "modified_on", nullable: true })
    modifiedOn?: Date;

    @Column("json", { name: "additional_info", nullable: true })
    additionalInfo?: JSON;

    @ManyToOne(() => Header, (header) => header.banners)
    @JoinColumn([{ name: "header_id", referencedColumnName: "id" }])
    public header: Header;


}

