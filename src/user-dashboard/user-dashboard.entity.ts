import { Graph } from "src/graph/graph.entity";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class UserDashboard extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Graph, (graph) => graph.userDashboard, {
    eager: true,
    cascade: true,
  })
  graphs: Graph[];
}
