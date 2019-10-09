# Docker start

1. [Official Website](https://docs.docker.com/get-started/) 

2. [Docker Curriculum](https://docker-curriculum.com/)

3. [Reponsive Course](https://www.katacoda.com/courses/docker/deploying-first-container)

Containers are istances of images with pull or run(pull and start) and you can make images also from containers with docker commit and push.

Start with well-built Dockerfile to make docker image.

```console
$docker build --tag=imagename . // node-ubuntu
```
 
Then verify it with

```console
$docker image ls
```

and

```console
$docker run -p 8888:3000 imagename // node-ubuntu
```

first in foreground and

```console
$docker run -d -p 8888:3000 imagename // node-ubuntu
```

and verify container was made with 

```console
$docker container ls
```

## Install

[Search and read the documenation for your system](https://www.google.com/search?q=how+to+install+docker+on+ubunutu) or **$docker** in your CLI and follow the information it gives.

## Verify it work

Follow [the instruction](https://thenewstack.io/how-to-deploy-a-container-with-docker/).

```console
$docker search nginx
$docker pull nginx 
$docker run --name nginx-webserver -p 80:80 nginx
```

Then visit http://localhost/ and will show

```console
Welcome to nginx!

If you see this page, the nginx web server is successfully installed and working. Further configuration is required.

For online documentation and support please refer to nginx.org.
Commercial support is available at nginx.com.

Thank you for using nginx.
```

in localhost webpage.

## List and remove previous docker instances

```console
$docker ps -a
```

will show list of instances you executed before

```console
$docker stop containerid
$docker rm containerid 
```

Then, use the command to remove what you wouldn't use.

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

Then, install curl first to download other programs.

```console
$apt-get update
$apt-get install curl
$curl https://www.steadylearner.com
```

If you are out, you can start it with 

```console
$docker exec -it CONTAINER_id bash
``` 

Read more about [docker lifecycle](https://medium.com/@nagarwal/lifecycle-of-docker-container-d2da9f85959)

## Install Node

```console
curl -sL https://deb.nodesource.com/setup_12.x | bash
```

will show


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

```
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

## Test yarn and NPM

Verify the version

```console
$yarn -v
```

[Start the Node project](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-18-04/) and Install chalk


```console
$cd /home
$mkdir node && cd node
$yarn init
$yarn add chalk
```

Test it work

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

## Install Vim

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

## Install git

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

For example, clone this repository

```console
$git clone https://github.com/steadylearner/docker-example.git
```

## How to move your local folder and files to docker

You may use this instead of git command.

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

## Install Express and how to visit the web server in docker container

Install Express inside the docker and build hello-world app

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

Then, **$node server.js** will show this message but visiting http://localhost:3000 won't work.

```console
Express Server ready at http://localhost:3000
```

So we will inspect docker container ip with **$docker inspect containerid > inspect.txt**

Then, find IP in inspect.txt and will be similar to **172.17.0.2**. 

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

will show you IP is 172.17.0.2 with the route of yours server. 

Visit http://172.17.0.2:3000/ and verify

```console
Hello World!
``` 

in your browser.

You could also test **$docker port** command.

```console
$docker prot --help
$docker port ubuntu_test
```

Your package.json in docker container would be similar to this at this point.

```json
{
  "name": "yarn",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "chalk": "^2.4.2",
    "express": "^4.17.1"
  },
  "scripts": {
    "serve": "node server.js"
  }
}
```

## Show logs of the container

```console
$docker logs containerid | name
```

## Show history of the image

```console
#docker history steadylearner/ubuntu-node
```

## Remove unused images

```console
$docker images
$docker image dockerimagename
```

## Rename the container

```console
$docker rename randomname ubunut_node
```

and you can use name instead of id. For example, **$docker exec -it ubuntu-node bash** instead.

## Pause and unpause it

```console
$docker pause containerid | name
$docker ps -a
$docker unpuase containerid | name
$docker ps -a
``` 
## Start and stop it

```conolse
$docker stop containerid | name
$docker ps -a
$docker start containerid | name
$docker ps -a
```

## Remove container

```console
$docker container rm containerid | name
```

## How to modify network ports for docker image

[Search](https://www.google.com/search?&q=how+to+assign+port+for+docker+container) or start with custom port you want to use

**$docker run** equals to **$docker create** and **docker start***

```console
$docker run -it --name ubuntu-node -p 80:80 ubuntu
```

>By default, the port on the host is mapped to 0.0.0.0, which means all IP addre>sses. You can specify a particular IP address when you define the port mapping,> for example, -p 127.0.0.1:80:80

```console
docker run -d --name ubuntu-node -p 80:80 ubuntu:latest
```

[-d make the container run in background.](https://docs.docker.com/engine/reference/run/)

## How to create docker image from a container

[Create a repository first](https://cloud.docker.com/repository/create) and login at your CLI with this.

```console
$docker login
```

Then, use **$docker commit** with [this blog posts](https://www.scalyr.com/blog/create-docker-image)

```console
$docker commit ubuntu-node
```

Then, verify it with 

```console
$docker images
```

Give it tag(name) with 

```console
$docker tag imageid steadylearner/ubuntu-node
```

or you could execute this command instead of them.

```console
$docker commit ubuntu-node steadylearner/ubuntu-node
```

## How to push your docker image to Docker Hub

```console
$docker push steadylearner/ubuntu-node
```

and wait for uploading process to complete.

Then, you can use 

```console
$docker run -it steadylearner/ubuntu-node bash
```

and you can follow the same process you used before and exit the container.

Then, use 

```console
$docker restart containerid
$docker exec -it containerid bash
```

and remove previous ubuntu docker image and ubuntu-node container if you want

```console
$docker stop ubuntu-node
$docker container rm ubuntu-node
$docker image rm ubuntu
```

Then, rename the container from steadylearner/ubuntu-node

```console
$docker container rename randomname ubuntu-node
```

## How to push the container after you modify it

Modify the project then

```console
$docker commit ubuntu-node steadylearner/ubuntu-node
```

or 

```console
$docker commit --message "Test message and will be similar to github -m option" ubuntu-node steadylearner/ubuntu-node
```

with commit message.

Then

```console
$docker push steadylearner/ubuntu-node
``` 

and

```console
$docker run -it steadylearner/ubuntu-node bash
```

or 

```console
$docker history steadylearner/ubuntu-node
```

to verify the result.

## Install Postgresql

[Refer to official example for postgresql](https://docs.docker.com/engine/examples/postgresql_service/), [volume](https://docs.docker.com/storage/volumes/) and [compose-file](https://docs.docker.com/compose/compose-file/).

[Read the pratical example](https://www.saltycrane.com/blog/2019/01/how-run-postgresql-docker-mac-local-development/)

## Test your gRPC or graphql project with it locally first
