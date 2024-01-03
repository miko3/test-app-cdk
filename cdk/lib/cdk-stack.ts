import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr'
import * as image_deploy from 'cdk-docker-image-deployment'
import * as path from 'path'

const versionTag: string = 'v1'

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const repository = new ecr.Repository(this, 'MyRepository', {
      repositoryName: 'backend-test',
      imageTagMutability: ecr.TagMutability.IMMUTABLE,
    })

    new image_deploy.DockerImageDeployment(this, 'imageDeployWithTag', {
      source: image_deploy.Source.directory(path.join('..', 'backend')),
      destination: image_deploy.Destination.ecr(repository, {
        tag: versionTag,
      })
    })
  }
}
