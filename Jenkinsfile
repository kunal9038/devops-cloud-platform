pipeline {

    agent any

    environment {
        DOCKERHUB_USERNAME = 'kunalsingh9038'
        BACKEND_IMAGE = 'devops-cloud-backend'
        FRONTEND_IMAGE = 'devops-cloud-frontend'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set Image Tag') {
            steps {
                script {
                    env.IMAGE_TAG = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()

                    echo "Docker Image Tag: ${env.IMAGE_TAG}"
                }
            }
        }

        stage('Backend Tests') {
            steps {
                sh '''
                    docker run --rm \
                    -v "$PWD/backend:/app" \
                    -w /app \
                    python:3.13-slim \
                    sh -c "pip install -r requirements.txt && pytest"
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    docker build \
                    -t ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:${IMAGE_TAG} \
                    ./backend

                    docker build \
                    -t ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:${IMAGE_TAG} \
                    ./frontend
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASSWORD" | docker login \
                        -u "$DOCKER_USER" \
                        --password-stdin

                        docker push ${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:${IMAGE_TAG}
                        docker push ${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:${IMAGE_TAG}

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'CI/CD pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }
    }
}