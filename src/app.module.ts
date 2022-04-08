import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { CommunityModule } from './community/community.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.pass'),
        database: configService.get('database.db'),
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],
        cli: {
          migrationsDir: 'src/migrations',
        },
        synchronize: false,
      }),
    }),
    UserModule,
    AuthModule,
    CommunityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
