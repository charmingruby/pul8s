import * as awsx from "@pulumi/awsx";

export const PROJECT_NAME = "pul8s"
const MANAGED_BY = "pulumi"

interface ResourceTagsOutput {
    [key: string]: string
}

export function NewResourceTags(resourceName: string): ResourceTagsOutput {
    return {
        Name: resourceName,
        ManagedBy: MANAGED_BY,
        ProjectName: PROJECT_NAME,
        CreatedAt: new Date().toISOString()
    }
}