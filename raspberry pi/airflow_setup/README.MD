## Airflow setup on raspberry
1. setup docker on raspberry

Before setup update the raspberry 
```
> sudo apt-get update && sudo apt-get upgrade -y
```
## Installing Docker
```
> curl -fsSL https://get.docker.com -o get-docker.sh
> sudo sh get-docker.sh
> sudo usermod -aG docker pi
```

test the docker installation
```
> docker info
> docker run arm32v7/hello-world
```
# Build docker image
```
> time docker build --tag airflow:0.1.0 .
```
