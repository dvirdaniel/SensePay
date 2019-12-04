import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppGateway} from "./app.gateway";
import {TasksModule} from "./tasks/tasks.module";


@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb://localhost/sense-pay',{
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
