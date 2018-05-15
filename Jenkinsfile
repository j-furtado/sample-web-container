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
        withDockerRegistry([
          credentialsId: 'acr-credentials',
          url: "azcontregxpto.azurecr.io"
        ]) {
          sh "docker push azcontregxpto.azurecr.io/node:latest"
          sh "docker build -f 'Dockerfile' -t azcontregxpto.azurecr.io/sampleweb ."
        }
      }
    }
    stage('Push Image') {
      steps{
        // Pushes the image to the registry
        withDockerRegistry([
          credentialsId: 'acr-credentials',
          url: "azcontregxpto.azurecr.io"
        ]) {
          sh "docker push azcontregxpto.azurecr.io/sampleweb"
        }
      }
    }
    stage('Deploy') {
      steps{
        // Deploys a container with the generated container image
        acsDeploy(azureCredentialsId: 'az-credentials',
            resourceGroupName: "${params.KUBE_RSGRP}",
            containerService: "${params.KUBE_SERVICE}",
            sshCredentialsId: 'kube_master_ssh',
            configFilePaths: "${params.KUBE_CONFIG}",
            enableConfigSubstitution: true,
            secretName: "${params.KUBE_SECRET}",
            secretNamespace: 'default',
            containerRegistryCredentials: [
                [credentialsId: 'acr-credentials', url: "${params.ACR_LOGINSERVER}"]
            ])
      }
    }
  }
}
