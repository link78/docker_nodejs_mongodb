pipeline {
  agent any

  stages {
   
    stage('build image'){
        steps{
           
            
            sh "docker build -t faso/emplweb ."              
     }
    }
    stage('pushing image'){
        steps{
            
            
             sh "docker run --name web -d -p 6088:8080 faso/emplweb"
        
     }
    }
    
    
   
  }
}
