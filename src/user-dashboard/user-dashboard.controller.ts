import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserDashboardDto } from "./dto/user-dashboard.dto";
import { UserDashboard } from "./user-dashboard.entity";
import { UserDashboardService } from "./user-dashboard.service";

@Controller("dashboard")
export class UserDashboardController {
  constructor(private userDashboardService: UserDashboardService) {}

  @Get()
  getAllUserDashboards(): Promise<UserDashboard[]> {
    return this.userDashboardService.getAllUserDashboards();
  }

  @Get("/:id")
  getUserDashboardById(
    @Param("id", ParseUUIDPipe)
    id: string
  ): Promise<UserDashboard> {
    return this.userDashboardService.getUserDashboardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUserDashboard(
    @Body() createUserDashboardDto: UserDashboardDto
  ): Promise<UserDashboard> {
    return this.userDashboardService.createUserDashboard(
      createUserDashboardDto
    );
  }

  @Delete("/:id")
  deleteUserDashboardById(
    @Param("id", ParseUUIDPipe)
    id: string
  ): Promise<void> {
    return this.userDashboardService.deleteUserDashboardById(id);
  }

  @Patch("/:id")
  updateUserDashboardById(
    @Param("id", ParseUUIDPipe)
    id: string,
    @Body() userDashboardDto: UserDashboardDto
  ): Promise<UserDashboard> {
    return this.userDashboardService.updateUserDashboardById(
      id,
      userDashboardDto
    );
  }

  @Post("clone-dashboard/:id")
  async cloneUserDashboard(
    @Param("id", ParseUUIDPipe)
    id: string,
    @Body() userDashboardDto: UserDashboardDto
  ) {
    const {
      title,
      description,
      graphs,
    } = await this.userDashboardService.getUserDashboardById(id);
    userDashboardDto.title = title;
    userDashboardDto.description = description;
    userDashboardDto.graphs = graphs;
    return this.userDashboardService.createUserDashboard(userDashboardDto);
  }
}
