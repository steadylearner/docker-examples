const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const chalk = require("chalk");

const resolvers = require("./resolvers");

const PROTO_PATH = "./typeDefs/user_product.proto";
const options = require("./options");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const user_product_proto = grpc.loadPackageDefinition(packageDefinition);

const main = () => {
	const server = new grpc.Server();

	server.addService(user_product_proto.UserProductService.service, resolvers);
	const port = "127.0.0.1:50051";

	server.bind(port, grpc.ServerCredentials.createInsecure());
	const blue = chalk.blue;
	const target = blue(`http://${port}`);

	console.log(`🚀 gRPC user server ready at ${target}`);
	server.start();
};

main();



