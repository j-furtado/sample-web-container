pipeline {
  agent any

  stages{
    def app
    stage('Clone Repo'){
      // grab the source code from the repo
      checkout scm
    }
    stage('Build') {
      steps{
        // Builds the container image
        app = docker.build("${params.ACR_LOGINSERVER}/sampleweb")
      }
    }
    stage('Push Image') {
      steps{
        // Pushes the image to the registry
        docker.withRegistry("${params.ACR_LOGINSERVER}", 'acr-credentials') {
          app.push("${env.BUILD_NUMBER}")
          app.push("latest")
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
