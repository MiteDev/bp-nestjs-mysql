import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DatabaseModule from './config/databases/database.module';
import ConfigurationModule from './config/configuration/configuration.module';
import ConfigurationService from './config/configuration/configuration.service';

interface iConfiguration {
    database: {
        host: string;
        port: number;
        database: string;
        user: string;
        password: string;
    };
}

@Module({
    imports: [
        ConfigurationModule.forRoot({
            isGlobal: true,
            jsonFilePath: '../config.json',
        }),
        DatabaseModule.forRoot({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (
                configurationService: ConfigurationService<iConfiguration>,
            ) => ({
                host: configurationService.get('database.host'),
                port: configurationService.get('database.port'),
                user: configurationService.get('database.user'),
                password: configurationService.get('database.password'),
                database: configurationService.get('database.name'),
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
