import * as awsx from '@pulumi/awsx';
import { NewResourceName } from '../shared/resource/name';
import { NewResourceTags } from '../shared/resource/tags';

export function NewVpc(azCount: number): awsx.ec2.Vpc {
    return new awsx.ec2.Vpc(NewResourceName("vpc"), {
        numberOfAvailabilityZones: azCount,
        tags: NewResourceTags("vpc"),
    })
}