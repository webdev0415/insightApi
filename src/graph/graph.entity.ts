import { GraphData } from "../graph-data/graph-data.entity";
import { UserDashboard } from "../user-dashboard/user-dashboard.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Graph extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  pos: string;

  @Column()
  graphType: string;

  @Column()
  height: string;

  @Column()
  width: string;

  @Column()
  title: string;

  @Column({ type: "varchar2", length: 2000, nullable: true })
  settings: string;

  @Column({ nullable: true })
  filter: string;

  @OneToMany(() => GraphData, (gd) => gd.graphs, { eager: true, cascade: true })
  data: GraphData[];

  @ManyToOne(() => UserDashboard, (ud) => ud.graphs, { onDelete: "CASCADE" })
  userDashboard: UserDashboard;
}
