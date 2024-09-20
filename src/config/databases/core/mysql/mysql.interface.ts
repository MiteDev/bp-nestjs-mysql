import { PoolOptions } from 'mysql2/promise';
import { ModuleMetadata } from '@nestjs/common';

interface MysqlModuleOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useFactory?: (...args: any[]) => Promise<PoolOptions> | PoolOptions;
}

export { MysqlModuleOptions };
