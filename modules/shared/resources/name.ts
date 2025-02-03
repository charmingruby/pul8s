import { PROJECT_NAME } from "./constants"

export const resourceNaming = (resourceName: string): string => {
    return resourceName + "-" + PROJECT_NAME
}