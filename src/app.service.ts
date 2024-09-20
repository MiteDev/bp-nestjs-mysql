import { Injectable } from '@nestjs/common';
import ConfigurationService from './config/configuration/configuration.service';

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigurationService<any>) {}
    getHello(): string {
        return 'Hello World!';
    }
}
