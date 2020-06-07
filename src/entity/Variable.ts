import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity
  } from "typeorm"
  
  @Entity()
  export class Variable extends BaseEntity{
  
      @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    name!: string;
  
  }