import * as k8s from '@pulumi/kubernetes'

interface DeploymentProps {
    appName: string
    image: string
    containerPort: number
    clusterProvider: k8s.Provider
}

export const deployment = (props: DeploymentProps): k8s.apps.v1.Deployment => {
    const { appName, image, containerPort, clusterProvider } = props

    const appLabels = { appClass: appName }

    return new k8s.apps.v1.Deployment(appName, {
        metadata: {
            name: appName
        },
        spec: {
            replicas: 2,
            selector: {
                matchLabels: appLabels,
            },
            template: {
                metadata: {
                    labels: appLabels,
                },
                spec: {
                    containers: [
                        {
                            name: appName,
                            image: image,
                            ports: [{ containerPort }]
                        }
                    ]
                },
            },
        },
    },
        { provider: clusterProvider }
    )
}

interface ServiceProps {
    appName: string
    containerPort: number
    clusterProvider: k8s.Provider
}

export const service = (props: ServiceProps): k8s.core.v1.Service => {
    const { appName, containerPort, clusterProvider } = props

    const appLabels = { appClass: appName }

    return new k8s.core.v1.Service(appName, {
        metadata: {
            name: appName
        },
        spec: {
            selector: appLabels,
            ports: [
                {
                    port: 80,
                    targetPort: containerPort
                }
            ],
            type: "LoadBalancer"
        }
    },
        { provider: clusterProvider }
    )
}