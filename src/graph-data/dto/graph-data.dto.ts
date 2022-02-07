import { IsNotEmpty } from "class-validator";

export class GraphDataDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  data: string;
}
