import { PROJECT_NAME } from "./tags";

export function NewResourceName(resourceName: string): string {
    return resourceName + "-" + PROJECT_NAME
}