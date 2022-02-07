import { EntityRepository, Repository } from "typeorm";
import { GraphDto } from "./dto/graph.dto";
import { Graph } from "./graph.entity";

@EntityRepository(Graph)
export class GraphRepository extends Repository<Graph> {
  async createGraph(graphDto: GraphDto): Promise<Graph> {
    const {
        pos,
        graphType,
        height,
        width,
        title,
        filter,
        settings,
        data,
        userDashboardId,
      } = graphDto,
      graph = new Graph();
    graph.pos = pos;
    graph.graphType = graphType;
    graph.height = height;
    graph.width = width;
    graph.title = title;
    graph.filter = filter;
    graph.settings = settings;
    graph.data = data;
    graph.userDashboard = <any>{ id: userDashboardId };

    await graph.save();
    return graph;
  }

  async getAllGraphs(dashboardId: string): Promise<Graph[]> {
    const graphs = await this.createQueryBuilder("graph")
      .leftJoinAndSelect("graph.data", "graph-data")
      .where("graph.userDashboardId = :dashboardId", { dashboardId })
      .getMany();

    return graphs;
  }
}
