import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity
  } from "typeorm"
  
  @Entity()
  export class Content extends BaseEntity{
  
      @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    method_id!: number;
  
    @Column()
    header!: string;

    @Column()
    description!: string;
  
  }