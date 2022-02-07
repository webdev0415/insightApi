import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserDashboardModule } from "./user-dashboard/user-dashboard.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { GraphModule } from "./graph/graph.module";
import { GraphDataModule } from "./graph-data/graph-data.module";
import { DatasetsModule } from "./datasets/datasets.module";
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserDashboardModule,
    GraphModule,
    GraphDataModule,
    DatasetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
