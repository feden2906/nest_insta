import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TagModule } from "@app/tag/tag.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthMiddleware } from "@app/user/middlewares/auth.middleware";
import { ArticleModule } from "./article/article.module";
import { AwsSdkModule } from "nest-aws-sdk";
import { S3 } from "aws-sdk";
import { GoogleOauthController } from "./google-oauth/google-oauth.controller";
import { GoogleOauthModule } from "./google-oauth/google-oauth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "postgres",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      entities: [__dirname + '/shared/db/entities/**/*.entity.{js,ts}'],
      migrationsTableName: "migration",
      migrations: ["migrations/*.js"],
      cli: {
        migrationsDir: "src/migrations"
      },
      synchronize: true
    }),
    AwsSdkModule.forRoot({
      defaultServiceOptions: {
        region: process.env.S3_BUCKET_REGION,
        accessKeyId: process.env.S3_BUCKET_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY
      },
      services: [S3]
    }),
    TagModule,
    UserModule,
    ArticleModule,
    GoogleOauthModule,
ConfigModule.forRoot()
  ],
  controllers: [AppController, GoogleOauthController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: "*",
      method: RequestMethod.ALL
    });
  }
}



//docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres -h postgres
