import { Graph } from "src/graph/graph.entity";
import { GraphService } from "src/graph/graph.service";
import { EntityRepository, Repository } from "typeorm";
import { UserDashboardDto } from "./dto/user-dashboard.dto";
import { UserDashboard } from "./user-dashboard.entity";
import { GraphDto } from "../graph/dto/graph.dto";

@EntityRepository(UserDashboard)
export class UserDashboardRepository extends Repository<UserDashboard> {
  constructor(public graphService: GraphService) {
    super();
  }

  async getGraphs(graphs: string[]): Promise<Graph[]> {
    const arr = [];
    graphs.map(async (uuid) =>
      arr.push(await this.graphService.getGraphById(uuid))
    );

    return arr;
  }

  async createUserDashboard(
    createUserDashboardDto: UserDashboardDto
  ): Promise<UserDashboard> {
    const { title, description, graphs } = createUserDashboardDto,
      userDashboard = new UserDashboard();
    userDashboard.title = title;
    userDashboard.description = description;
    userDashboard.graphs = await graphs.map((param: any) => {
      const graph: any = new Graph();
      graph.pos = param.pos;
      graph.graphType = param.graphType;
      graph.height = param.height;
      graph.width = param.width;
      graph.title = param.title;
      graph.filter = param.filter;
      graph.settings = param.settings;
      graph.data = param.data;
      return graph;
    });
    await userDashboard.save();
    return userDashboard;
  }

  async getAllUserDashboards(): Promise<UserDashboard[]> {
    const dashboards = await this.createQueryBuilder("user-dashboard")
      .leftJoinAndSelect("user-dashboard.graphs", "graph")
      .getMany();
    return dashboards;
  }
}
