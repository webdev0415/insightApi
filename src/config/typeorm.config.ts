import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "oracle",
  host: "172.30.3.170",
  port: 1521,
  username: "insight",
  password: "B5VowPkjum2GVqto",
  sid: "ple1live",
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
  logging: true,
};
