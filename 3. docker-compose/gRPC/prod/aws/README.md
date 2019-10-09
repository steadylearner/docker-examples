# How to deploy better with aws

Use Curl and other programs.

## Curl

1. Verify the result 

```curl
$curl yourawswebsite
```

2. Include headers

```curl
$curl -H "your-custom-header: www.steadylearner.com" yourawswebsite
$curl -H "your-custom-header: steady" -H "another-header: learner" www.steadylearner.com
```

## Docker commands or Dockerfile to make your custom Docker images.

1. Edit Docker container 

```console
$docker search ubuntu
$docker run ubuntu 
$docker ps -a
$docker exec -it ubuntu bash
$docker commit ubuntu steadylearner/ubuntu
$docker push steadylearner/ubuntu
```

or use Dockerfile.

2. Define network and inspect it

```console
$docker network create steadylearner
$docker network create steadylearner yournetwork
```

or use docker-compose.yml to do them all.

## alias in .bashrc file for Docker and aws

Edit .bashrc with this.

```console
$vim ~/.bashrc
```

and save commands similar to it

```bash
#aws 
alias configure-ecs="ecs-cli configure --region us-east-1 --cluster docker"
alias start-ecs="ecs-cli up --keypair docker --capability-iam --size 2 --instance-type t2.micro --force"
alias fargate="ecs-cli compose up --launch-type FARGATE"
alias ec2="ecs-cli compose up"
alias stop-ecs="ecs-cli compose stop"
```

and **$source ~/.bashrc** to use them.

Use FARGATE for it will be much more useful to deploy microservices(You can connect them with their container names or with localhost:port. They shouldn't be duplicate.)

## Start with ec2 and use fargate.

**start-ecs** will make VPC, subnets, security groups autoamtically and you can use them in fargate ecs-params.yml.

Test first your project with ec2 and if fails with network, use fargate option.

```yml
version: 1
task_definition:
  task_execution_role: ecsTaskExecutionRole
  ecs_network_mode: awsvpc
  task_size:
    mem_limit: 0.5GB
    cpu_limit: 256
run_params:
  network_configuration:
    awsvpc_configuration:
      subnets:
        - "yoursubnet"
        - "yourothersubnet"
      security_groups:
        - "yoursecuritygroup"
      assign_public_ip: ENABLED
```

