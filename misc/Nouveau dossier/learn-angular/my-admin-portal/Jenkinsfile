pipeline{
    agent any

    tools {
      nodejs 'node'
    }

    triggers {
      pollSCM '* * * * *'
    }

    stages{
        /*stage("Git checkout"){
            steps{
                // Get some code from a GitHub repository
                git credentialsId: 'ssh_priv_key', url: 'git@github.com:szairi2011/my-admin-portal.git', branch: 'users-list-page'
            }
        }*/
        stage('Build') {
          steps {
            // Build ng app
            sh "npm install"
          }
          post {
            always {
              emailext to: 'test@jenkins',
                      recipientProviders: [developers(), requestor()],
                      subject: "Job: \'${JOB_NAME}\' -- Build: ${BUILD_NUMBER} -- Result: ${currentBuild.result}",
                      body: 'Please go to ${BUILD_URL} and verify the build ...',
                      attachLog: true,
                      compressLog: true

            }
            // changed {
            //   emailext body: 'Please go to ${BUILD_URL} and verify the build ...', recipientProviders: [developers(), requestor()], subject: 'Job: ${JOB_NAME} -- Build: ${BUILD_NUMBER} -- Result: ${currentBuild.result}', to: 'test@jenkins'
            // }
          }
        }
        stage('Deploy') {
          steps {
            // Deploy ng app and run json-server
            sh "npm run dev"
          }
        }
    }
}
