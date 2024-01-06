import { IRepository, Repository, TagMutability } from "aws-cdk-lib/aws-ecr";
import {
	Destination,
	DockerImageDeployment,
	Source,
} from "cdk-docker-image-deployment";
import { Construct } from "constructs";
import path = require("path");

export class ImageRepository extends Construct {
	repository: IRepository;

	constructor(scope: Construct, id: string) {
		super(scope, id);

		const repository = new Repository(this, "RustBackendRepository", {
			repositoryName: "rust_backend",
			imageTagMutability: TagMutability.IMMUTABLE,
		});

		const result = new DockerImageDeployment(this, "RustBackendImage", {
			source: Source.directory(path.join('..', 'backend')),
			destination: Destination.ecr(repository, {
				tag: "v1",
			}),
		});

		this.repository = repository;
	}
}