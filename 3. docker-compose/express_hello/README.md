# What can you do with it

You can deploy it with aws ec2 and ecs and verify the result easily with express. Use it instead of the python app from [the docker curriculum](https://docker-curriculum.com/#aws-elastic-container-service) with [how to set up ecs permissions](https://getstream.io/blog/deploying-the-winds-api-to-aws-ecs-with-docker-compose/) with [aws iam](https://console.aws.amazon.com/iam/home?#/users).

## READ First

1. [Docker Curriculum](https://docker-curriculum.com/#docker-on-aws)
2. [aws elasticbeanstalk](https://console.aws.amazon.com/elasticbeanstalk)
3. [aws vpc](https://console.aws.amazon.com/vpc/) # Create VPC and the default vpc

There are many requirements uncommented from the curriculum. You should make vpc, subnet, IAM rules etc to make it all work.

You should make [ec2 load balancers to use many routes](https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#LoadBalancers:)

Then, you can use **ecs-cli up --keypair docker --capability-iam --size 2 --instance-type t2.micro** command.

## Payloads

1. Dockerfile

2. Dockerun.aws.json
