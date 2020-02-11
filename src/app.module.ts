import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypegooseModule } from 'nestjs-typegoose';

import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    CharactersModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.mongoUri,
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
