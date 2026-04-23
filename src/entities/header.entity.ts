import { JoinColumn, Entity, Column, OneToMany, ManyToOne, Generated } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Banners } from "./banners.entity";
import { Sections } from "./sections.entity";

@Entity({ name: "header" })
export class Header extends AbstractEntity {
    @Generated("uuid")
    @Column({ name: "id", primary: true, nullable: false })
    id: string;

    @Column("integer", { name: "seq", primary: false, nullable: false })
    seq: number;
    
    @Column("character varying", { name: "name", primary: false, nullable: true })
    name: string;

    @Column("character varying", { name: "en_menu", primary: false, nullable: false })
    enMenu: string;
    
    @Column("character varying", { name: "ar_menu", primary: false, nullable: false })
    arMenu: string;

    @Column("boolean", { name: "is_active", primary: false, default: true })
    isActive: boolean;

    @Column("timestamp without time zone", { name: "created_on", nullable: true })
    createdOn?: Date;

    @Column("timestamp without time zone", { name: "modified_on", nullable: true })
    modifiedOn?: Date;

    @OneToMany(() => Banners, (banner) => banner.header)
    public banners: Banners[];

    @OneToMany(() => Sections, (section) => section.header)
    public sections: Sections[];

}
