import { Inject, Injectable } from '@nestjs/common';
import { CONFIGURATION_SERVICE_TOKEN } from './configuration.constants';
import { iConfigurationOption } from './configuration.interface';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export default class ConfigurationService<T> {
    private configFile: T;

    constructor(
        @Inject(CONFIGURATION_SERVICE_TOKEN)
        private options: iConfigurationOption,
    ) {
        const { jsonFilePath } = this.options;
        const filePath = path.resolve(__dirname, '../../', jsonFilePath);

        this.fileExistCheck(filePath);
        this.configFile = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    private fileExistCheck(filePath: string) {
        if (!fs.existsSync(filePath)) {
            throw new Error(
                'Configuration file does not exists on path - ' + filePath,
            );
        }
    }

    get<T>(key: string): T {
        console.log(this.configFile[key]);
        return this.configFile[key];
    }
}
