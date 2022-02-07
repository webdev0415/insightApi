import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      logger: ["error", "warn", "debug"],
      cors: true,
    }),
    options = new DocumentBuilder()
      .setTitle("Plexxis Insight")
      .setDescription("API Documentation")
      .setVersion("0.1")
      .addTag("data")
      .build(),
    document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  await app.listen(8000);
}

bootstrap();
