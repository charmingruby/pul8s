import * as network from './modules/network'
import * as compute from './modules/compute'

const vpc = network.createVpc(2)

const cluster = compute.createEks(vpc)

export const clusterName = cluster.core.tags
export const clusterEndpoint = cluster.core.endpoint
export const kubeconfig = cluster.kubeconfig

const deployment = compute.kubernetesManifests.deployment({
    appName: "podummy",
    image: "charmingruby/podummy:latest",
    containerPort: 8080,
    clusterProvider: cluster.provider
})

const service = compute.kubernetesManifests.service({
    appName: "podummy",
    containerPort: 8080,
    clusterProvider: cluster.provider
})

export const serviceHostName = service.status.loadBalancer.ingress[0].hostname