# How to make docker images

1. Remove or comment .env relevnat codes from db, tests, `__tests__` and its relevant packages 

We will use docker-compose env definition instead of it not to commit it to docker hub. 
 
2. Build a Dockerfile to make docker images and containers(instances of them) with this command in each folder.

```console
$docker build --tag=name .
```

Use **0.0.0.0** instead of 127.0.0.1 and localhost to make the code work inside the container.(Make your web app serve 80 if you find a problem when you deploy.)

You can connect to another container in the same network by using their container name.(You can also use localhost and port if you use aws fargate service with docker-compose.yml and ecs-params.yml. You can find examples in **docker-compose** folder.)

```console
$docker network create networkname && docker network connect networkname containername
```

or define it in your docker-compose.yml.

3. You may delete test and lint relevant packages and files and save them in prod folder after you deploy them with aws and others. 



