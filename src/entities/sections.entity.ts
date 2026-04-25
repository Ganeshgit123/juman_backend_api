import { JoinColumn, Entity, Column, OneToMany, ManyToOne, Generated } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Header } from "./header.entity";
import { Images } from "./images.entity";

@Entity({ name: "sections" })
export class Sections extends AbstractEntity {
    @Generated("uuid")
    @Column({ name: "id", primary: true, nullable: false })
    id: string;

    @Column("integer", { name: "seq", primary: false, nullable: true })
    seq: number;

    @Column("varchar", { name: "code", primary: false, nullable: true, length: 6 })
    code: string;

    @Column("varchar", { name: "er_title", primary: false, nullable: true, length: 255 })
    erTitle: string;

    @Column("varchar", { name: "ar_title", primary: false, nullable: true, length: 255 })
    arTitle: string;

    @Column("text", { name: "er_content", primary: false, nullable: true })
    erContent: string;

    @Column("text", { name: "ar_content", primary: false, nullable: true })
    arContent: string;

    @Column("boolean", { name: "is_active", primary: false, default: true })
    isActive: boolean;

    @Column("timestamp", { name: "created_on", nullable: true })
    createdOn?: Date;

    @Column("timestamp", { name: "modified_on", nullable: true })
    modifiedOn?: Date;

    @Column("json", { name: "additional_info", nullable: true })
    additionalInfo?: JSON;

    @ManyToOne(() => Header, (header) => header.sections)
    @JoinColumn([{ name: "header_id", referencedColumnName: "id" }])
    public header: Header;

    @OneToMany(() => Images, (images) => images.section)
    public images: Images[];



}

