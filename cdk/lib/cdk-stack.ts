import { Construct } from 'constructs';
import {
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { ImageRepository } from './constructs/ImageRepository';
import { AppRunner } from './constructs/AppRunner';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const imageRepository = new ImageRepository(this, "ImageRepository");

    const backendApp = new AppRunner(this, "RustBackend", {
      repository: imageRepository.repository,
    });

    backendApp.node.addDependency(imageRepository);
  }
}