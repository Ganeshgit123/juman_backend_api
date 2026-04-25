import { JoinColumn, Entity, Column, OneToMany, ManyToOne, Generated } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity({ name: "footer" })
export class Footer extends AbstractEntity {
    @Generated("uuid")
    @Column({ name: "id", primary: true, nullable: false })
    id: string;

    @Column("text", { name: "address", primary: false, nullable: true })
    address: string;

    @Column("varchar", { name: "name", primary: false, nullable: false, length: 255 })
    name: string;

    @Column("varchar", { name: "mobile_number", primary: false, nullable: false, length: 255 })
    mobileNumber: string;

    @Column("varchar", { name: "email", primary: false, nullable: false, length: 255 })
    email: string;

    @Column("varchar", { name: "copyright", primary: false, nullable: true, length: 255 })
    copyright: string;

    @Column("varchar", { name: "fb_link", primary: false, length: 255 })
    fbLink: boolean;

    @Column("varchar", { name: "insta_link", primary: false, length: 255 })
    instaLink: boolean;

    @Column("varchar", { name: "twitter_link", primary: false, length: 255 })
    twitterLink: boolean;

    @Column({ type: 'json', nullable: true })
    quickLink: JSON;

    @Column("timestamp", { name: "created_on", nullable: true })
    createdOn?: Date;
}