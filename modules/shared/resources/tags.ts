import * as awsx from "@pulumi/awsx";

import { MANAGED_BY, PROJECT_NAME } from './constants'

interface ResourceTagsOutput {
    [key: string]: string
}

export const resourceTagging = (resourceName: string): ResourceTagsOutput => {
    return {
        Name: resourceName,
        ManagedBy: MANAGED_BY,
        ProjectName: PROJECT_NAME,
        CreatedAt: "04/02/2045"
    }
}