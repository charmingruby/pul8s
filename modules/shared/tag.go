package shared

import (
	"time"

	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

const (
	PROJECT_NAME = "pul8s"
	DEPARTMENT   = "Engineering"
	MANAGED_BY   = "Pulumi"
)

func NewCommonTags(resource string) pulumi.StringMap {
	parsedDate := time.Now().Format("2006-01-02")

	return pulumi.StringMap{
		"Name":       pulumi.String(PROJECT_NAME + "-" + resource),
		"Department": pulumi.String(DEPARTMENT),
		"ManagedBy":  pulumi.String(MANAGED_BY),
		"CreatedAt":  pulumi.String(pulumi.String(parsedDate)),
	}
}
