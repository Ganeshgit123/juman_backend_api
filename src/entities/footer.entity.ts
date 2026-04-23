import { JoinColumn, Entity, Column, OneToMany, ManyToOne, Generated } from "typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity({ name: "footer" })
export class Footer extends AbstractEntity {
    @Generated("uuid")
    @Column({ name: "id", primary: true, nullable: false })
    id: string;

    @Column("text", { name: "address", primary: false, nullable: true })
    address: string;

    @Column("character varying", { name: "mobile_number", primary: false, nullable: false })
    mobileNumber: string;
    
    @Column("character varying", { name: "email", primary: false, nullable: false })
    email: string;

    @Column("character varying", { name: "copyright", primary: false, nullable: true })
    copyright: string;    

    @Column("character varying", { name: "fb_link", primary: false })
    fbLink: boolean;
    
    @Column("character varying", { name: "insta_link", primary: false })
    instaLink: boolean;
    
    @Column("character varying", { name: "twitter_link", primary: false })
    twitterLink: boolean;
    
    @Column("jsonb", { name: "quick_link", primary: false })
    quickLink: JSON;

    @Column("timestamp without time zone", { name: "created_on", nullable: true })
    createdOn?: Date;
}