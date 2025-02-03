import { Vpc } from '@pulumi/awsx/ec2';

import * as resources from '../shared/resources';

export const vpc = (azCount: number): Vpc => {
    return new Vpc(resources.naming("vpc"), {
        numberOfAvailabilityZones: azCount,
        tags: resources.tagging("vpc"),
    })
}