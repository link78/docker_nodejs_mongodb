pipeline {
  agent any

  stages {
   
    stage('build image'){
        steps{
           
         //   sh "docker login $ACR_LOGIN -u $ACR -p ACR_PASSWORD"
            sh "docker build -t $ACR_LOGIN/emplweb ."              
     }
    }
    stage('pushing image'){
        steps{
            
         //   sh "docker push $ACR_LOGIN/emplweb"
             sh "docker run --name web -d -p 4545:8080 $ACR_LOGIN/emplweb"
        
     }
    }
    
    
   
  }
}
