# How to make docker images

1. Remove or comment .env relevant codes from db, tests, `__tests__` and its relevant packages 

We will use docker-compose.yml **env-files** definition instead of it. It will hep you not to commit .env files to docker hub. 
 
2. Build the docker images with this command in each folder.

```console
$docker build --tag=name .
```

Use **0.0.0.0** instead of **127.0.0.1 and localhost** to make the docker network connect the docker containers.(Make your web app serve 80 if you find a problem when you deploy.)

You can connect to another container in the same network by using their container name.(You can also use localhost and port if you use aws fargate with docker-compose.yml and ecs-params.yml. You can find examples in **docker-compose** folder.)

You can manually make network and include containers with it.

```console
$docker network create networkname && docker network connect networkname containername
```

or define those in your docker-compose.yml.

3. You may delete **test** and **lint** relevant packages and files. Then, save them in **prod** folder after you test them with aws and others. 



