package compute

import (
	"pul8s/modules/shared"

	"github.com/pulumi/pulumi-awsx/sdk/go/awsx/ec2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func NewVPC(ctx *pulumi.Context) (*ec2.Vpc, error) {
	azCount := 2

	vpc, err := ec2.NewVpc(ctx, "pul8s", &ec2.VpcArgs{
		NumberOfAvailabilityZones: &azCount,
		Tags:                      shared.NewCommonTags("vpc"),
	})
	if err != nil {
		return nil, err
	}

	return vpc, nil
}
