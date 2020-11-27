pipeline {
  agent any

  stages {
   
    stage('build image'){
        steps{
           
            sh "docker login -u $DOCKER_ID -p $Password"
            sh "docker build -t $DOCKER_ID/emplweb ."              
     }
    }
    stage('Deploy to dev') {
            steps {
               sh 'docker run --name web-dev -d -p 4541:8080 $DOCKER_ID/emplweb'
            }
        }
        stage('Deploy to qa') {
            steps {
               sh 'docker run --name web-qa -d -p 4540:8080 $DOCKER_ID/emplweb'
            }
        }
        stage('Approve to prod') {
            steps {
              timeout(time:1, unit:'DAYS') {
		         input('Do you want to deploy to live?')
	     }
      }
        }
    
     stage('Remove old build image'){
        steps{
           
            sh "docker rm -f web-qa"
	    sh "docker rm -f web-dev"
	    sh "docker rm -f web"
                        
     }
    }
        stage('Deploy container to production') {
            steps {
                sh 'docker run --name web -d -p 4545:8080 $DOCKER_ID/emplweb'
                sh 'docker ps'
            }
        }
    }
}
