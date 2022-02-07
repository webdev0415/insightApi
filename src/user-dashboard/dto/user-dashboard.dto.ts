import { IsNotEmpty, IsOptional } from "class-validator";
import { Graph } from "src/graph/graph.entity";

export class UserDashboardDto {
  id: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  graphs: Graph[];
}
