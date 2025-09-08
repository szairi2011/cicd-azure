pipeline {
//     agent any
    agent {label 'java17-maven-agent'}
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/szairi2011/allure-cucumber5-testng-maven.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    allure includeProperties:
                        false,
                        jdk: '',
                        results: [[path: 'build/allure-results']]
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'mvn allure:report'
            }
        }
    }

    post {
        always {
            // Archive the test artifacts
            archiveArtifacts 'target/*.jar'

            // Send an email notification
            mail itTo: 'recipient@example.com',
                  subject: 'Jenkins Build Notification',
                  body: 'The Jenkins build has completed successfully.'
        }
    }
}