import { Cluster } from '@pulumi/eks'
import * as awsx from '@pulumi/awsx';
import * as aws from "@pulumi/aws";
import { Role } from '@pulumi/aws/iam';

import * as resources from '../../shared/resources';

export const eks = (vpc: awsx.ec2.Vpc): Cluster => {
    const { vpcId, publicSubnetIds } = vpc

    return new Cluster(resources.naming("eks"), {
        vpcId: vpcId,
        subnetIds: publicSubnetIds,
        desiredCapacity: 2,
        minSize: 2,
        maxSize: 2,
        storageClasses: "gp2",
        instanceType: "t2.micro",
        instanceRole: workerRole(),
        tags: resources.tagging("eks"),
    })
}

const workerRole = (): Role => {
    const workerRole = new aws.iam.Role(resources.naming("eks-worker-role"), {
        assumeRolePolicy: JSON.stringify({
            Version: "2012-10-17",
            Statement: [
                {
                    Effect: "Allow",
                    Principal: { Service: "ec2.amazonaws.com" },
                    Action: "sts:AssumeRole",
                },
            ],
        }),
    });

    new aws.iam.RolePolicyAttachment("eksWorkerNodePolicy", {
        role: workerRole.name,
        policyArn: "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy",
    });

    new aws.iam.RolePolicyAttachment("eksCniPolicy", {
        role: workerRole.name,
        policyArn: "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy",
    });

    new aws.iam.RolePolicyAttachment("eksEc2ContainerRegistryPolicy", {
        role: workerRole.name,
        policyArn: "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly",
    });

    return workerRole
}