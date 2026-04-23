import { JoinColumn, Entity, Column, OneToMany, ManyToOne, Generated } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Header } from "./header.entity";
import { Sections } from "./sections.entity";

@Entity({ name: "images" })
export class Images extends AbstractEntity {
    @Generated("uuid")
    @Column({ name: "id", primary: true, nullable: false })
    id: string;

    @Column("integer", { name: "seq", primary: false, nullable: true })
    seq: number;

    @Column("character varying", { name: "path", primary: false, nullable: true })
    path: string;

    @Column("boolean", { name: "is_active", primary: false, default: true })
    isActive: boolean;

    @Column("timestamp without time zone", { name: "created_on", nullable: true })
    createdOn?: Date;

    @Column("timestamp without time zone", { name: "modified_on", nullable: true })
    modifiedOn?: Date;

    @ManyToOne(() => Sections, (section) => section.images)
    @JoinColumn([{ name: "section_id", referencedColumnName: "id" }])
    public section: Sections;

}

