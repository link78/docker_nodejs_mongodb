pipeline {
  agent any

  stages {
   
    stage('build image'){
        steps{
           
            sh "docker login $ACR_LOGIN -u $ACR -p ACR_PASSWORD"
            sh "docker build -t $DOCKER_ID/emplweb ."              
     }
    }
    stage('pushing image'){
        steps{
            
         //   sh "docker push $ACR_LOGIN/emplweb"
             sh "docker run --name web -d -p 4545:8080 $DOCKER_ID/emplweb"
        
     }
    }
    
    
   
  }
}
