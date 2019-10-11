# How to learn docker

Start with these.

1. [Official Website](https://docs.docker.com/get-started/)

2. [Docker Curriculum](https://docker-curriculum.com/)

3. [Reponsive Course](https://www.katacoda.com/courses/docker/deploying-first-container)

## Install

[Search and read the documenation for your system](https://www.google.com/search?q=how+to+install+docker+on+ubunutu) or **$docker** in your CLI and follow the instruction.

## Verify it

Follow [the instruction](https://thenewstack.io/how-to-deploy-a-container-with-docker/).

```console
$docker search nginx
$docker pull nginx
$docker run --name nginx-webserver -p 80:80 nginx
```

Then visit [localhost](http://localhost) and will show this.

```console
Welcome to nginx!

If you see this page, the nginx web server is successfully installed and working. Further configuration is required.

For online documentation and support please refer to nginx.org.
Commercial support is available at nginx.com.

Thank you for using nginx.
```

in localhost webpage.

## Start the docker container in detached mode and execute commands with bash

```console
$docker run --name nginx-webserver -p 80:80 -d nginx
```

execute commands for the container with

```console
$docker exec -it CONTAINER_ID bash
```

## Use it with ubuntu

```console
$docker pull ubuntu
$docker run -it ubuntu sh
```

Then, install Curl first to download other programs.

```console
$apt-get update
$apt-get install curl
$curl https://www.steadylearner.com
```

If you are out, you can start it with

```console
$docker exec -it CONTAINER_id bash
```

Read more about [docker lifecycle](https://medium.com/@nagarwal/lifecycle-of-docker-container-d2da9f85959).

If you want to set up Node development environment. Follow these processes to install some of them.

You can use Dockerfile or [$docker run -d steadylearner/ubuntu_node](https://cloud.docker.com/u/steadylearner/repository/docker/steadylearner/ubuntu_node) instead.

<details>
  <summary>Node, NPM, Yarn</summary>

```console
curl -sL https://deb.nodesource.com/setup_12.x | bash
```

will show this.

```console
## Run `sudo apt-get install -y nodejs` to install Node.js 12.x and npm
## You may also need development tools to build native addons:
    sudo apt-get install gcc g++ make
## To install the Yarn package manager, run:
    curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get update && sudo apt-get install yarn
```

Command without sudo for root permission

```console
apt-get install gcc g++ make
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

apt-get update && apt-get install yarn
```

Follow the commmands and install them all.

Test node work with

```console
$node
$console.log("Hello from www.steadylearner.com");
```

</details>

<details>
  <summary>Vim</summary>

```console
apt install --assume-yes vim
```

It will install Vim text editor.

```console
$vim hello.js

Type

console.log("Hello from www.steadylearner.com");

:wq to save and quit.
```

```console
$node hello.js
Hello from www.steadylearner.com
```

</details>

<details>
  <summary>Git</summary>

```console
$apt-get --assume-yes git-core
```

It will install git and verify it with

```console
$git --version
```

Then, use your github user name and email

```console
$git config --get user.name
$git config --get user.email
```

and use them in docker container

```console
$git config --global user.name yourname
$git config --global user.name youremail
```

use the same command(--get) before to verify it

Test git clone work to download files from your previous project

For example, clone steadylearner/docker-examples repository with this.

```console
$git clone https://github.com/steadylearner/docker-examples.git
```

</details>

## Test them

Verify the yarn version.

```console
$yarn -v
```

[Start a Node project](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/).

```console
$cd /home
$mkdir node && cd node
$yarn init
$yarn add chalk
```

Test it work with this.

```js
// $node

const chalk = require("chalk");
const blue = chalk.blue;
const hello = blue("Hello from www.steadylearner.com");
console.log(hello);
```

We verified that NPM modules work in a docker container.

If you want

```console
$vim ~/.bashrc

Type

alias work="cd /home/node"
then :wq to save and quit
$source ~/.bashrc
```

Then, you can visit your node project with **$work** wherever you want.

## List and remove previous docker instances

```console
$docker ps -a
```

It will show the list of instances you executed before. Then, use these commands to remove what you wouldn't use.

```console
$docker stop containerid
$docker rm containerid
```

or

```console
$docker rm containerid -f
```

## How to move your local files and folers to docker contaienrs

We could use git commands to donwload files from the GitHub. We will also learn how to use docker commands to move local files and folder in your conatiners.

1. Files

```console
$docker cp from_localhost.txt containerid:/from_localhost.txt
$docker cp containerid:/from_docker from_docker.txt
```

2. Folders

```console
$docker cp from_localhost containerid:/from_localhost
$docker cp containerid:/from_localhost from_localhost
```

## How to use the web framework with docker containers

<details>
  <summary>Express</summary>

Install the dependencies we will use inside the docker container with this.

```console
$yarn add express chalk
```

Then, we will build hello-world app with JavaScript code below.

```js
// server.js
const express = require('express')
const chalk = require("chalk");

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

const blue = chalk.blue
const target = blue(`http://localhost:${port}`)

app.listen(port, () => console.log(`Express Server ready at ${target}`))
```

Then, **$node server.js** will show this message.

```console
Express Server ready at http://localhost:3000
```

But **$curl http://localhost:3000** or visiting it in your browser won't work yet.

Each container has its own ip and we should inspect the docker container with **$docker inspect containerid > inspect.txt** to find them.

It will be similar to **172.17.0.2**.

You can also make getIP.js and **$node getIP.js** to save your time.

```js
const fs = require('fs')

const filename = "inspect.txt";
in
fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;

  // console.log(`Read ${filename}`);
  const dataObject = JSON.parse(data);

  // console.log(payload);
  // console.log(typeof payload);

  const ip = dataObject[0].NetworkSettings.IPAddress;
  console.log(`IP is ${ip}`);
});
```

$curl http://172.17.0.2:3000/ or verify this in your browser.

```console
Hello World!
```

You could also use **$docker port** command.

```console
$docker port --help
$docker port containername
```

or

```console
$docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' containerId
```

Refer to [the inspect command from the docker official website](https://docs.docker.com/engine/reference/commandline/inspect/).

</details>

## Useful Commands

### Show logs of the container

```console
$docker logs containerid | name
```

### Show history of the image

```console
#docker history steadylearner/ubuntu_node
```

### Remove unused images

```console
$docker images
$docker image dockerimagename
```

### Rename the container

```console
$docker rename randomname ubunut_node
```

and you can use name instead of id. For example, **$docker exec -it ubuntu_node bash**.

### Pause and unpause the containers

```console
$docker pause containerid | name
$docker ps -a
$docker unpuase containerid | name
$docker ps -a
```

### Start and stop them

```conolse
$docker stop containerid | name
$docker ps -a
$docker start containerid | name
$docker ps -a
```

### Remove containers

```console
$docker container rm containerid | name
```

## How to modify network ports for docker image

[Search](https://www.google.com/search?&q=how+to+assign+port+for+docker+container) or start with custom port you want to use.

```console
$docker run -it --name ubuntu_node -p 80:80 ubuntu
```

>By default, the port on the host is mapped to 0.0.0.0, which means all IP addresses. You can specify a particular IP address when you define the port mapping,> for example, -p 127.0.0.1:80:80

```console
docker run -d --name ubuntu_node -p 80:80 ubuntu:latest
```

[-d make the container run in background.](https://docs.docker.com/engine/reference/run/)

## Images and Containers

Containers are istances of images.

1. You can pull or run(pull and start) images and it will make docker containers in your local machine.

2. You can edit containers with $docker exec -it containername bash.

3. Make images from them with $docker commit containername account/image && docker push account/image.

or you can start with Dockerfile instead of **1.** and **2.** and commit your docker images.

### How to create a docker image from a container

[Create a repository first at Dockerhub](https://cloud.docker.com/repository/create) and login to your CLI with this.

```console
$docker login
```

Then, use **$docker commit** with [this blog posts](https://www.scalyr.com/blog/create-docker-image)

```console
$docker commit ubuntu_node
```

Then, verify it with

```console
$docker images
```

Give it tag(name) with

```console
$docker tag imageid steadylearner/ubuntu_node
```

or you could execute this command instead of them.

```console
$docker commit ubuntu_node steadylearner/ubuntu_node
```

### How to push your docker image to Docker Hub

```console
$docker push steadylearner/ubuntu_node
```

Wait for uploading process to complete and you can use this.

```console
$docker run -it steadylearner/ubuntu_node bash
```

Then, follow the same process you used before and exit the container.

You can restart the containers with this.

```console
$docker restart containerid
$docker exec -it containerid bash
```

You can remove previous ubuntu docker image and ubuntu_node container if you want

```console
$docker stop ubuntu_node
$docker container rm ubuntu_node
$docker image rm ubuntu
```

Then, rename the container from steadylearner/'

```console
$docker container rename randomname ubuntu_node
```

Use your container name instead of ubuntu_node or steadylearner/ubuntu_node.

## How to push the container after you modify it

Modify the project then use this.

```console
$docker commit ubuntu_node steadylearner/ubuntu_node
```

or

```console
$docker commit --message "Test message and will be similar to github -m option" ubuntu_node steadylearner/ubuntu_node
```

with commit message.

Then use this to commit the image made from it.

```console
$docker push steadylearner/ubuntu_node
```

and

```console
$docker run -it steadylearner/ubuntu_node bash
```

or

```console
$docker history steadylearner/ubuntu_node
```

to verify the result.

## How to use database with docker containers

You should learn how [volume](https://docs.docker.com/storage/volumes/) and [compose-file](https://docs.docker.com/compose/compose-file/) work first.

<details>
  <summary>Postgresql</summary>

1. [Official Example](https://docs.docker.com/engine/examples/postgresql_service/)

2. [Read the pratical example](https://www.saltycrane.com/blog/2019/01/how-run-postgresql-docker-mac-local-development/)

</details>

## How to deploy your docker images

1. Code

2. Make docker images with Dockerfile and codes from **1.**

3. Deploy them with docker-compose

4. Test end points with Curl or other test frameworks.

5. Learn SDK for Docker, aws and others

[You may read this and test it in your local machine.](https://github.com/steadylearner/docker-examples/blob/master/0.%20learn/prod/README.md)

## READ MORE

1. [Building Blocks of Amazon ECS](https://aws.amazon.com/pt/blogs/compute/building-blocks-of-amazon-ecs/)
2. [rds](https://aws.amazon.com/rds/) or [docker Cloudstor plugin with volume](https://spotinst.com/blog/ecs-persistent-storage-docker-plugins/) to use postgresql

