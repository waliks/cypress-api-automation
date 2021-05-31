pipeline {
  
  agent any

  stages {
    stage('build and test') {
      steps {
        sh 'npm install'
        sh 'npm run test'
      }
    }
  }
}
