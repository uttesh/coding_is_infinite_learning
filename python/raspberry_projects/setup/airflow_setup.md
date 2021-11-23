# Airflow setup on RaspberryPI

1. Update the libs and repos to latest

```
> sudo apt-get update && sudo apt-get upgrade -y
```

2. download docker sh and install
```
> curl -fsSL https://get.docker.com -o get-docker.sh
> sudo sh get-docker.sh
> sudo usermod -aG docker pi
```

3. Testing the docker installation
```
> sudo docker run arm32v7/hello-world
```