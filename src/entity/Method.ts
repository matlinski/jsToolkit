import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity
  } from "typeorm"
  
  @Entity()
  export class Method extends BaseEntity{
  
      @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    category_id!: number;

      @Column()
    name!: string;
  
  }
  