import { entities } from '@app/entity';
import { FirebaseConfigClass } from '@app/type';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IsEmail, IsEnum, IsIn, IsNumberString, IsOptional, IsString, validateSync } from 'class-validator';
import { ValidationError } from 'class-validator/validation/ValidationError';
import { DotenvParseOutput, parse } from 'dotenv';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fileExistsSync } from 'tsconfig-paths/lib/filesystem';
import { NodeEnv } from './enum/node-env.enum';

export type Config = Record<string, string>;

@Injectable()
export class ConfigService {
  @IsString()
  public readonly ENCRYPTION: string;
  @IsString() @IsOptional()
  public readonly HOST?: string;
  @IsString()
  public readonly DB_URL: string;
  @IsIn(['mysql', 'mariadb'])
  public readonly DB_TYPE: 'mysql' | 'mariadb' = 'mysql';
  @IsString()
  public readonly FIREBASE_ADMIN_PRIVATE_KEY: string;
  @IsEmail()
  public readonly FIREBASE_ADMIN_CLIENT_EMAIL: string;
  @IsString()
  public readonly FIREBASE_ADMIN_PROJECT_ID: string;
  @IsEnum(NodeEnv)
  public readonly NODE_ENV: NodeEnv;
  @IsNumberString() @IsOptional()
  public readonly PORT?: string = '3000';
  public readonly ormConfig: TypeOrmModuleOptions;
  public readonly firebaseAdminConfig: admin.ServiceAccount;

  // only use test {

  @IsString() @IsOptional()
  public readonly FIREBASE_API_KEY: string;
  @IsString() @IsOptional()
  public readonly FIREBASE_APP_ID: string;
  @IsString() @IsOptional()
  public readonly FIREBASE_ID: string;
  @IsString() @IsOptional()
  public readonly FIREBASE_PW: string;
  @IsString() @IsOptional()
  public readonly FIREBASE_MEASUREMENT_ID: string;
  @IsString() @IsOptional()
  public readonly FIREBASE_MESSAGING_SENDER_ID: string;
  public readonly firebaseConfig: FirebaseConfigClass;

  // }

  public constructor(filePath?: string, customConfig?: Config) {
    let env: DotenvParseOutput;
    if (filePath && fileExistsSync(filePath)) {
      env = parse(readFileSync(filePath));
    }

    Object.assign(this, {
      NODE_ENV: NodeEnv.development,
      ...env, ...process.env, ...customConfig,
    });

    const errors: ValidationError[] = validateSync(this);
    if (0 < errors.length) {
      throw new Error(errors[0].toString());
    }

    this.ormConfig = {
      database: /\/.*$/i.exec(this.DB_URL)[0],
      entities: entities,
      synchronize: true,
      type: this.DB_TYPE,
      url: this.DB_URL,
    };

    this.firebaseAdminConfig = {
      clientEmail: this.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: this.FIREBASE_ADMIN_PRIVATE_KEY,
      projectId: this.FIREBASE_ADMIN_PROJECT_ID,
    };

    this.firebaseConfig = {
      apiKey: this.FIREBASE_API_KEY,
      appId: this.FIREBASE_APP_ID,
      authDomain: `${this.FIREBASE_ADMIN_PROJECT_ID}.firebaseapp.com`,
      databaseURL: `https://${this.FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`,
      measurementId: this.FIREBASE_MEASUREMENT_ID,
      messagingSenderId: this.FIREBASE_MESSAGING_SENDER_ID,
      projectId: this.FIREBASE_ADMIN_PROJECT_ID,
      storageBucket: `${this.FIREBASE_ADMIN_PROJECT_ID}.appspot.com`,
    };
  }
}

export const config: ConfigService = new ConfigService(resolve(process.cwd(), '.env'));
