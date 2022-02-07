import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphRepository } from "../graph/graph.repository";
import { UserDashboardDto } from "./dto/user-dashboard.dto";
import { UserDashboard } from "./user-dashboard.entity";
import { UserDashboardRepository } from "./user-dashboard.repository";

@Injectable()
export class UserDashboardService {
  constructor(
    @InjectRepository(UserDashboardRepository)
    private userDashboardRepository: UserDashboardRepository,
    @InjectRepository(GraphRepository)
    private graphRepository: GraphRepository
  ) {}

  async getAllUserDashboards() {
    const found = await this.userDashboardRepository.getAllUserDashboards();
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async getUserDashboardById(id: string): Promise<UserDashboard> {
    const found = await this.userDashboardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async createUserDashboard(
    createUserDashboardDto: UserDashboardDto
  ): Promise<UserDashboard> {
    return this.userDashboardRepository.createUserDashboard(
      createUserDashboardDto
    );
  }

  async deleteUserDashboardById(id: string): Promise<void> {
    // Delete all graphs under this dashboard first
    const { graphs } = await this.userDashboardRepository.findOne(id),
      deletes = graphs.map((graph) => this.graphRepository.delete(graph.id));
    await Promise.all(deletes);

    // Delete the dashboard itself
    const result = await this.userDashboardRepository.delete(id);
    if (!result) {
      throw new NotFoundException();
    }
  }

  async updateUserDashboardById(
    id: string,
    userDashboardDto: UserDashboardDto
  ): Promise<UserDashboard> {
    const { description, title, graphs } = userDashboardDto,
      userDashboard = await this.getUserDashboardById(id);

    if (!userDashboard) {
      throw new NotFoundException();
    }

    userDashboard.title = title;
    userDashboard.description = description;
    userDashboard.graphs = graphs;

    await userDashboard.save();
    return userDashboard;
  }
}
