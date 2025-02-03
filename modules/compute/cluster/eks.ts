import { Cluster } from '@pulumi/eks'
import * as awsx from '@pulumi/awsx';

import * as resources from '../../shared/resources';

const eks = (vpc: awsx.ec2.Vpc): Cluster => {
    const { vpcId, publicSubnetIds } = vpc

    return new Cluster(resources.naming("eks"), {
        vpcId: vpcId,
        subnetIds: publicSubnetIds,
        desiredCapacity: 2,
        minSize: 2,
        maxSize: 2,
        tags: resources.tagging("eks"),
    })
}