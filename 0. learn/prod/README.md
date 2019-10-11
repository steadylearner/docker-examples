# How to test docker images in your local machine

Start with these but you don't have to spend much time with them because there are already examples in [Steadylearner Docker Examples](https://github.com/steadylearner/docker-examples)

1. [Docker Swarm](https://docs.docker.com/get-started/part3/)

2. [aws website](https://aws.amazon.com/pt/elasticbeanstalk/), [ecs](https://docker-curriculum.com/#docker-on-aws)

When you deploy your containers, it is called services.

## Start with Dockerfile

```console
$docker build --tag=ubuntu_node .
```

Dockerfile is just the set of commands you used before.

## Install Docker Swarm

```console
$sudo apt install docker-compose
```

## Make docker images to services in localhost

Use **$docker swarm init** if you haven't yet in the folder you want to test docker containers with it.

Then, use this.

```console
$docker stack deploy -c docker-compose.yml ubuntunode
// Creating network productusers_webnet
// Creating service productusers_web
```

Test [$docker-compose up ubuntunode](https://docs.docker.com/compose/) command later.

You can verify the result with

```console
$docker service ls # or
$docker stack services ubuntunode
```

Containers in services are called tasks. Verify them with this.

```console
$docker service ps ubuntunode_web # or
$docker container ls -q
```

and all the tasks with this.

```console
$docker container ls -q
```

With this(a single-host mode on local machine), you can visit http://localhost:3000/ and verify the result.

## Use Swarm with Docker Machine made from virtual machines

[Install docker-machine first with this commands.](https://docs.docker.com/machine/install-machine/#installing-machine-directly)

```console
base=https://github.com/docker/machine/releases/download/v0.16.0 &&
  curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
  sudo mv /tmp/docker-machine /usr/local/bin/docker-machine &&
  chmod +x /usr/local/bin/docker-machine
```

and **$docker-machine --version**.

This point, your containers join Docker swarm clusters and called **nodes** and managed by **swarm manager**(swarm mode and can include **workers** to help them.)

You need to install [virtualbox](https://www.virtualbox.org/wiki/Linux_Downloads) first.

[Refer to this to install them](https://vitux.com/how-to-install-virtualbox-on-ubuntu/).

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
$docker-machine ssh myvm1 "docker swarm init --advertise-addr yourvirtualmachineip"
$docker-machine ssh myvm2 "command shown by the preivous command with token"
// This node joined a swarm as a worker.
```

Verify the result

```console
$docker-machine ssh myvm1 "docker node ls"
```

## Use docker-machine env to make it more easily usable

```console
$docker-machine env myvm1
```

Then, follow the instruction and verify the result with **docker-machine ls** and show active state with *.

Repeat the same process we used before with this.

```console
$docker stack deploy -c docker-compose.yml ubuntunode
$docker service ls
$docker service ps ubuntunode_web or docker service ls ubuntunode
```

Then, you can see the myvm1 and myvm2 are used for **node**.

Refer to **docker-machine ls** and

You can visit yourvirtualmachineip or othervirtualmachinerip and verify the result.
(http://localhost:3000 won't work with this.)

They affect the performance of the machine so use it with caution.

```console
// Remove them after you test
$docker-machine rm myvm1 myvm2
$eval $(docker-machine env -u)
```

If you want to restart the virtual machines, use them.

```console
$docker-machine ls
$docker-machine start myvm1
$docker-machine start myvm2
# and port will work anyway and you can test them with $virtualbox also
```
