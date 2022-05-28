import { JestEnvironmentConfig, EnvironmentContext } from '@jest/environment';
import dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { exec } from 'node:child_process';
import crypto from 'node:crypto';
import util from 'node:util';
import path from 'path';
import { Client } from 'pg';

dotenv.config({ path: '.env.testing' });

const execSync = util.promisify(exec);

const prismaBinary = './node_modules/.bin/prisma';

export default class PrismaTestEnvironment extends NodeEnvironment {
    private schema: string;
    private connectionString: string;

    constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
        super(config, context);

        const dbUser = process.env.DATABASE_USER;
        const dbPass = process.env.DATABASE_PASS;
        const dbHost = process.env.DATABASE_HOST;
        const dbPort = process.env.DATABASE_PORT;
        const dbName = process.env.DATABASE_NAME;

        this.schema = `test_${crypto.randomUUID()}`;
        this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`;
    }

    async setup() {
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;

        await execSync(`"${path.resolve(prismaBinary)}" migrate deploy`);

        return super.setup();
    }

    async teardown() {
        const client = new Client({
            connectionString: this.connectionString,
        });

        await client.connect();
        await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
        await client.end();
    }
}
