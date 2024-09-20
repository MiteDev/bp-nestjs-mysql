import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { MysqlModuleOptions } from './mysql.interface';
import { MYSQL_MODULE_ID, MYSQL_MODULE_OPTIONS } from './mysql.constants';
import { PoolOptions, createPool } from 'mysql2/promise';

@Global()
@Module({})
export class MysqlCoreModule {
    static forRootAsync(mysqlModuleOptions: MysqlModuleOptions): DynamicModule {
        const mysqlProvider: Provider = {
            provide: MYSQL_MODULE_ID,
            useFactory: (options: PoolOptions) => {
                return createPool(options);
            },
            inject: [MYSQL_MODULE_OPTIONS],
        };

        console.log(mysqlModuleOptions);

        const asyncProviders = this.createProviders(mysqlModuleOptions);

        const providers = [mysqlProvider, ...asyncProviders];

        const exports = [mysqlProvider, ...asyncProviders];

        console.log(providers);

        return {
            module: MysqlCoreModule,
            imports: mysqlModuleOptions.imports,
            providers,
            exports,
        };
    }

    private static createProviders(options: MysqlModuleOptions): Provider[] {
        return [this.createOptionsProvider(options)];
    }

    private static createOptionsProvider(options: MysqlModuleOptions) {
        return {
            provide: MYSQL_MODULE_OPTIONS,
            useFactory: options.useFactory,
            inject: options.inject,
        };
    }
}
