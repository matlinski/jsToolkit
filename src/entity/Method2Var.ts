import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity
  } from "typeorm"
  
  @Entity()
  export class Method2Var extends BaseEntity{
  
      @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    method_id!: number;
  
    @Column()
    variable_id!: number;
  
  }