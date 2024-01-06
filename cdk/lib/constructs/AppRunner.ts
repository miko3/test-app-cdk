import { IRepository } from "aws-cdk-lib/aws-ecr";
import {
	aws_apprunner as apprunner,
} from 'aws-cdk-lib';
import { Construct } from "constructs";

export type AppRunnerProps = {
	repository: IRepository;
};

export class AppRunner extends Construct {
	constructor(scope: Construct, id: string, props: AppRunnerProps) {
		super(scope, id);

		const appRunnerECRAccessRole = process.env.ECR_ARN;
		const { repository } = props;

		const cfnService = new apprunner.CfnService(this, 'AppRunnerService', {
			sourceConfiguration: {
				authenticationConfiguration: {
					accessRoleArn: appRunnerECRAccessRole,
				},
				autoDeploymentsEnabled: false,
				imageRepository: {
					imageIdentifier: repository.repositoryUriForTag("v1"),
					imageRepositoryType: 'ECR',
					imageConfiguration: {
						port: '8080',
						runtimeEnvironmentVariables: [],
					},
				},
			},
			healthCheckConfiguration: {
				interval: 5,
				healthyThreshold: 2,
			},
		});
	}
}