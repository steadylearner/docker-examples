# How to use aws

1. [Make aws account first.](https://aws.amazon.com/) 

2. Read [how to make a docker-compose.yml](https://docs.docker.com/compose/compose-file/#command) and ecs-params.yml.

3. [Follow this example.](https://docker-curriculum.com/#docker-on-aws) It may not work perfectly for your project. So just refer to it and find more resources. You can easily deploy your web app with [Dockerrun.aws.json or docker-compose.yml](https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html#create_deploy_docker_v2config_dockerrun) from [elasticbeanstalk](https://aws.amazon.com/pt/elasticbeanstalk/). 

4. If you want to use datbases in docker container, refer to [this](https://www.saltycrane.com/blog/2019/01/how-run-postgresql-docker-mac-local-development)

5. [Install ecs-cli](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_CLI_installation.html), [aws cli](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/install-linux-al2017.html), and [Make key pair and save it in your local machine](https://console.aws.amazon.com/ec2/home?region=us-east-1#KeyPairs:sort=keyName)

Your [aws ami](https://console.aws.amazon.com/iam/home) definition while you follow **3.** and this repository should be similar to this.

```console
aws-elasticbeanstalk-ec2-role
aws-elasticbeanstalk-service-role
AWSServiceRoleForAutoScaling
AWSServiceRoleForECS
AWSServiceRoleForElasticLoadBalancing
AWSServiceRoleForRDS
AWSServiceRoleForSupport
AWSServiceRoleForTrustedAdvisor
ecsinstanceRole
ecsTaskExeuctionRole
amazon-ecs-cli-setup-docker
rds-monitoring-role
```

Test **3.** with **express_hello** in this folder first and verify it work with your mobile and laptop before you read on. 

You may set up default [VPC and subnet](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html) with [security groups](https://docs.aws.amazon.com/pt_br/vpc/latest/userguide/VPC_SecurityGroups.html) and [keypair](https://console.aws.amazon.com/ec2/home#KeyPairs) if some commands require it. Delete them later if they become unnecessary.

Security groups are similar to firewalls. You can use myip or all trafic for allowed inbound routes when you deploy. It will make Curl or other commands and your code work. You may remove those options for development later for security. 

## Official documentations 

1. https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/GettingStarted.html
2. https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/create_deploy_docker.html
3. https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/create_deploy_nodejs.html
4. https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/create-deploy-python-apps.html

Read those first if you want.

## Then, find early more practical examples with github and blog posts.

1. [It will help you deploy your microservices with ecs fargate.](https://github.com/burningion/ecs-fargate-deployment-tutorial/blob/master/ecs-params.yml)

2. [Read this if you have problems while you use ecs-cli](https://github.com/aws/amazon-ecs-cli/issues/627)

The payload of them are **you should use FARGATE instead of ec2** to connect containers in the same network. It will make **localhost:port** and **containername** work as it does in your local docker-compose environment.

It only works with awsvpc option when you deploy them to aws. [FARGATE](https://medium.com/@matheus510.fonseca/aws-ecs-fargate-what-it-is-should-i-use-80d678e00ab9) launch option is specialized to work only with awsvpc. The documentations won't never tell you about it directly.

**Use this command.**

```console
$ecs-cli compose up --launch-type FARGATE
```


