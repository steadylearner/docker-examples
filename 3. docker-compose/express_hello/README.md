Use [this docker curriculum](https://docker-curriculum.com/#aws-elastic-container-service) with [how to set up ecs permissions](https://getstream.io/blog/deploying-the-winds-api-to-aws-ecs-with-docker-compose/) with [aws iam](https://console.aws.amazon.com/iam/home?#/users) and **ecs-cli up --keypair docker --capability-iam --size 2 --instance-type t2.micro** command

You should make [ec2 load balancers to use many routes](https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#LoadBalancers:)
