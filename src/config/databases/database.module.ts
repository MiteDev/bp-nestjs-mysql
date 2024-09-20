import { DynamicModule, Global, Module } from '@nestjs/common';
import { MysqlCoreModule } from './core/mysql/mysql.module';
import { MysqlModuleOptions } from './core/mysql/mysql.interface';
// import MysqlService from './mysql.service';
import { DiscoveryModule } from '@nestjs/core';
// import RegisterTransactional from './transactional.service';

@Global()
@Module({
    imports: [MysqlCoreModule, DiscoveryModule],
    // providers: [RegisterTransactional],
    exports: [],
})
export default class DatabaseModule {
    static forRoot(options: MysqlModuleOptions): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [MysqlCoreModule.forRootAsync(options)],
        };
    }
}
