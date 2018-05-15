#!/bin/groovy
pipeline {
  agent any
  stages{
    stage('Clone Repo'){
      steps{
        // grab the source code from the repo
        checkout scm
      }
    }
    stage('Build') {
      steps{
        // Builds the container image
        sh 'docker pull node:latest'
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'acr-credentials',
          usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
            sh "docker login -u $USERNAME -p $PASSWORD https://${params.ACR_LOGINSERVER}"
            sh "docker tag node:latest ${params.ACR_LOGINSERVER}/node:latest"
            sh "docker push ${params.ACR_LOGINSERVER}/node:latest"
            sh "docker build -f 'Dockerfile' -t ${params.ACR_LOGINSERVER}/sampleweb ."
        }
      }
    }
    stage('Push Image') {
      steps{
        // Pushes the image to the registry
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'acr-credentials',
          usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
          sh "docker login -u $USERNAME -p $PASSWORD https://${params.ACR_LOGINSERVER}"
          sh "docker push ${params.ACR_LOGINSERVER}/sampleweb"
        }
      }
    }
    stage('Deploy') {
      steps{
        // Deploys a container with the generated container image
        acsDeploy(azureCredentialsId: 'az-credentials',
            resourceGroupName: "${params.KUBE_RSGRP}",
            containerService: "${params.KUBE_SERVICE} | Kubernetes",
            sshCredentialsId: 'kube_master_ssh',
            configFilePaths: "${params.KUBE_CONFIG}",
            enableConfigSubstitution: true,
            secretName: "${params.KUBE_SECRET}",
            secretNamespace: 'default',
            containerRegistryCredentials: [
                [credentialsId: 'acr-credentials', url: "https://${params.ACR_LOGINSERVER}"]
            ])

            /*acsDeploy azureCredentialsId: 'az-credentials',
                      configFilePaths: '.kube/config',
                      containerRegistryCredentials:
                      [[credentialsId: 'acr-credentials',
                      url: 'https://azcontregxpto.azurecr.io']],
                      containerService: 'azure_kubernetes | Kubernetes',
                      dcosDockerCredentialsPath: '',
                      resourceGroupName: 'kubernetes_rsgrp',
                      secretName: 'default-token-85kz3',
                      sshCredentialsId: 'kube_master_ssh'
*/
      }
    }
  }
}
