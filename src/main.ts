import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ConfigurationService from './config/configuration/configuration.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigurationService);
    console.log(configService);
    const { port } = configService.get<{ [key: string]: any }>('appConfig');
    await app.listen(port);
}
bootstrap();
