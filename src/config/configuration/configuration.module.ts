import { DynamicModule, Global, Module } from '@nestjs/common';
import { iConfigurationOption } from './configuration.interface';
import { CONFIGURATION_SERVICE_TOKEN } from './configuration.constants';
import ConfigurationService from './configuration.service';

@Global()
@Module({})
export default class ConfigurationModule {
    static forRoot(options: iConfigurationOption): DynamicModule {
        return {
            module: ConfigurationModule,
            providers: [
                {
                    useValue: options,
                    provide: CONFIGURATION_SERVICE_TOKEN,
                },
                ConfigurationService,
            ],
            global: options.isGlobal,
            exports: [ConfigurationService],
        };
    }
}
