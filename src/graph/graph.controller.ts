import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { GraphDto } from "./dto/graph.dto";
import { Graph } from "./graph.entity";
import { GraphService } from "./graph.service";

@Controller("graph")
export class GraphController {
  constructor(private graphService: GraphService) {}

  @Get()
  getAllGraphs(@Query() query): Promise<Graph[]> {
    return this.graphService.getAllGraphs(query.dashboardId);
  }

  @Get("/:id")
  getGraphById(
    @Param("id", ParseUUIDPipe)
    id: string
  ): Promise<Graph> {
    return this.graphService.getGraphById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createGraph(@Body() graphDto: GraphDto): Promise<Graph> {
    return this.graphService.createGraph(graphDto);
  }

  @Delete("/:id")
  deleteGraphById(
    @Param("id", ParseUUIDPipe)
    id: string
  ): Promise<void> {
    return this.graphService.deleteGraphById(id);
  }

  @Patch("/:id")
  updateGraphById(
    @Param("id", ParseUUIDPipe)
    id: string,
    @Body() graphDto: GraphDto
  ): Promise<Graph> {
    return this.graphService.updateGraphById(id, graphDto);
  }
}
