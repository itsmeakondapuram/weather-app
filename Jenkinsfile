pipeline {
    agent any
    environment {
        CLUSTER = "kind-dev"
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Build Docker Images') {
            steps {
                sh """
                docker build -t weather-api:v1 weather-api
                docker build -t notify-service:v1 notify-service
                """
            }
        }
        stage('Load Images to Kind') {
            steps {
                sh """
                kind load docker-image weather-api:v1 --name $CLUSTER
                kind load docker-image notify-service:v1 --name $CLUSTER
                """
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh "kubectl apply -f k8s.yaml"
                sh "kubectl apply -f ingress.yaml"
            }
        }
        stage('Verify Deployment') {
            steps {
                sh "kubectl get pods"
                sh "kubectl get svc"
            }
        }
    }
}

