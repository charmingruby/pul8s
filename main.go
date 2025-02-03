package main

import (
	"github.com/pulumi/pulumi-awsx/sdk/go/awsx/ec2"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		azCount := 2

		vpc, err := ec2.NewVpc(ctx, "pul8s", &ec2.VpcArgs{
			NumberOfAvailabilityZones: &azCount,
			Tags: pulumi.StringMap{
				"Name":      pulumi.String("pul8s-vpc"),
				"ManagedBy": pulumi.String("Pulumi"),
			},
		})
		if err != nil {
			return err
		}

		ctx.Export("vpcId", vpc.VpcId)

		return nil
	})
}
