import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '8520',
      database: 'task-management',
      autoLoadEntities: true, // find entity file and load them
      synchronize: true, // always keep database schema on sync
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
