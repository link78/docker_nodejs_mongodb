pipeline {
  agent any

  stages {
    stage('build') {
      steps {
        container('nodejs') {
          sh "node --version"
          sh 'apk update && apk add docker'
          sh 'docker --version'
          
        }
      }
    }
    stage('build image'){
        steps{
            container('nodejs') {
            sh "docker login $ACR_LOGIN -u $ACR -p ACR_PASSWORD"
            sh "docker build -t $ACR_LOGIN/emplweb ."
            
            
        }
     }
    }
    stage('pushing image'){
        steps{
            container('nodejs') {
            sh "docker push $ACR_LOGIN/emplweb"
        }
     }
    }
    
    
   
  }
}
