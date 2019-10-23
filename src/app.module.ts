import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    CharactersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.mongoUri,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
