import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Graph } from "src/graph/graph.entity";
import { GraphDto } from "./dto/graph.dto";
import { GraphRepository } from "./graph.repository";
import { async } from "rxjs";

@Injectable()
export class GraphService {
  constructor(
    @InjectRepository(GraphRepository)
    private graphRepository: GraphRepository
  ) {}

  async getAllGraphs(dashboardId: string): Promise<Graph[]> {
    const found = await this.graphRepository.getAllGraphs(dashboardId);

    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async getGraphById(id: string): Promise<Graph> {
    const found = await this.graphRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async createGraph(graphDto: GraphDto): Promise<Graph> {
    return this.graphRepository.createGraph(graphDto);
  }

  async deleteGraphById(id: string): Promise<void> {
    const result = await this.graphRepository.delete(id);

    if (!result) {
      throw new NotFoundException();
    }
  }

  async updateGraphById(id: string, graphDto: GraphDto): Promise<Graph> {
    const {
        pos,
        graphType,
        height,
        width,
        title,
        filter,
        settings,
        data,
      } = graphDto,
      graph = await this.getGraphById(id);

    if (!graph) {
      throw new NotFoundException();
    }

    graph.pos = pos;
    (graph.graphType = graphType),
      (graph.height = height),
      (graph.width = width),
      (graph.title = title);
    graph.filter = filter;
    graph.settings = settings;
    graph.data = data;

    await graph.save();
    return graph;
  }
}
