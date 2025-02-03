package main

import (
	"pul8s/modules/compute"

	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		vpc, err := compute.NewVPC(ctx)
		if err != nil {
			return err
		}

		ctx.Export("vpcId", vpc.VpcId)

		return nil
	})
}
