# How to deploy 

1. [Docker Swarm](https://docs.docker.com/get-started/part3/)

2. [aws website](https://aws.amazon.com/pt/elasticbeanstalk/), [From docker curriculum](https://docker-curriculum.com/#docker-on-aws)

When you deploy your containers, it is called services and those are used to do this.

## Start with Dockerfile

```console
$docker build --tag=ubuntu_node .
```

## Docker Swarm

Install it first with 

```console
$sudo apt install docker-compose
```

### 1. Make it to Services in localhost

and **$docker swarm init** if you haven't yet in the folder you want to deploy docker containers.

Then, deploy it with this.

```console
$docker stack deploy -c docker-compose.yml ubuntunode
// Creating network productusers_webnet
// Creating service productusers_web
```

Test [$docker-compose up ubuntunode](https://docs.docker.com/compose/) command later also.

You can verify the result with

```console
$docker service ls # or
$docker stack services ubuntunode
```

containers in a services are called tasks. Verify them with

```console
$docker service ps ubuntunode_web # or
$docker container ls -q
```

and all the tasks with this.

```console
$docker container ls -q
```

This point(a single-host mode on local machine)

You can visit http://localhost:3000/ and verify the result.

### 2. Use Swarm with Docker Machine made with virtualmachine

[Install it first](https://docs.docker.com/machine/install-machine/#installing-machine-directly)

```console
base=https://github.com/docker/machine/releases/download/v0.16.0 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
  sudo mv /tmp/docker-machine /usr/local/bin/docker-machine &&
  chmod +x /usr/local/bin/docker-machine
```

and **$docker-machine --version**.

This point, your containers join Docker swarm clusters and called **nodes** and managed by **swaram manager**(swarm mode and can include **workers** to help them.)

You need to install [virtualbox](https://www.virtualbox.org/wiki/Linux_Downloads) at this point and its role is hypervisor of docker nodes.

[Refer to this](https://vitux.com/how-to-install-virtualbox-on-ubuntu/).

```console
$virtualbox
$sudo apt install virtualbox-qt
$sudo apt remove virtualbox-qt
```

```console
$virtualbox
```

Make virtualbox with docker-machine

```console
$docker-machine create --driver virtualbox myvm1
$docker-machine create --driver virtualbox myvm2
// Docker is up and running!
$virtualbox or $docker-machine ls and it will show them
```

Make a manager and worker with them

```console
$docker-machine ssh myvm1 "docker swarm init --advertise-addr 192.168.99.100:2377"
$docker-machine ssh myvm2 "command shown by the preivous command with token"
// This node joined a swarm as a worker.
```

Verify the result

```console
$docker-machine ssh myvm1 "docker node ls"
```

#### Use docker-machine env to make it more easily usable

```console
$docker-machine env myvm1 
```

Then, copy and paste and follow the instruction

and verify the result with **docker-machine ls** and show active state with *.

Repeat the same process in **1.** with this.

```console
$docker stack deploy -c docker-compose.yml ubuntunode
$docker service ls 
$docker service ps ubuntunode_web or docker service ls ubuntunode
```

Then, you can see the myvm1 and myvm2 are used for **node**.

Refer to **docker-machine ls** and

You can visit http://192.168.99.101:3000/ or http://192.18.99.100:3000/ and verify the result.
(http://localhost:3000 won't work with this.)

It affects severly performance of the machine

```console
// Remove them after you test
$docker-machine rm myvm1 myvm2
$eval $(docker-machine env -u)
```

If you want to restart the machines

```
$docker-machine ls
$docker-machine start myvm1 
$docker-machine start myvm2
# and port will work anyway and you can test them with $virtualbox also
# is swarm and machine are separated and machines are necessary for swarm to work?
```

### Use stacks for many micro services to work

Could include visualizer with web service and read redis exmaple with [this](https://docs.docker.com/get-started/part5/) and new docker-compose file.

Should find which to use docker-engine enterprise or community, aws, kubernate etc and test with one of those cloud servers.

Search more before you move on to the aws about deploying docker images with docker enterprise and docker engine - community

## aws

1. Should make account first

2. [Follow this example](https://docker-curriculum.com/#docker-on-aws), https://www.saltycrane.com/blog/2019/01/how-run-postgresql-docker-mac-local-development, https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html#create_deploy_docker_v2config_dockerrun(Dockerrun.aws.json or aws-compose.yml)

https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/GettingStarted.html
https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/create_deploy_docker.html
https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/create_deploy_nodejs.html
https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/create-deploy-python-apps.html



