pipeline {
  agent any

  stages {
   
    stage('build image'){
        steps{
           
            sh "docker login -u $DOCKER_ID -p $Password"
            sh "docker build -t $DOCKER_ID/emplweb ."              
     }
    }
    stage('pushing image'){
        steps{
            
        
             sh "docker run --name web -d -p 4545:8080 $DOCKER_ID/emplweb"
        
     }
    }
    
    
   
  }
}
