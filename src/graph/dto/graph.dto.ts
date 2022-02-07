import { IsNotEmpty, IsOptional } from "class-validator";
import { GraphData } from "src/graph-data/graph-data.entity";

export class GraphDto {
  @IsNotEmpty()
  pos: string;

  @IsNotEmpty()
  graphType: string;

  @IsNotEmpty()
  height: string;

  @IsNotEmpty()
  width: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  filter: string;

  @IsOptional()
  settings: string;

  @IsNotEmpty()
  @IsOptional()
  data: GraphData[];

  @IsNotEmpty()
  userDashboardId: string;
}
