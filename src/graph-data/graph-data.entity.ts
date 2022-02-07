import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Graph } from "../graph/graph.entity";

@Entity()
export class GraphData extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  data: string;

  @ManyToOne(() => Graph, (g) => g.data, { onDelete: "CASCADE" })
  graphs: Graph;
}
