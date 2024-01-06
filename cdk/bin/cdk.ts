#!/usr/bin/env node
import 'source-map-support/register';
import 'dotenv/config';
import * as cdk from 'aws-cdk-lib';
import { CdkStack } from '../lib/cdk-stack';

const app = new cdk.App();
new CdkStack(app, 'CdkStack', {});