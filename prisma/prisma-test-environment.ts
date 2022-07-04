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

        this.schema = `test_${crypto.randomUUID()}`;

        this.connectionString = `${process.env.DATABASE_TEST_URL}?schema=${this.schema}`;
    }

    async setup() {
        await super.setup();
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;

        await execSync(`"${path.resolve(prismaBinary)}" migrate deploy`);
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
