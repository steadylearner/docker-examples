const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const chalk = require("chalk");

const productResolvers = require("./resolvers/product");

const PROTO_PATH = "./typeDefs/product.proto";
const options = require("../options");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const productproto = grpc.loadPackageDefinition(packageDefinition);

const main = () => {
	const server = new grpc.Server();

	server.addService(productproto.ProductService.service, productResolvers);
	const port = "0.0.0.0:50050";

	server.bind(port, grpc.ServerCredentials.createInsecure());
	const blue = chalk.blue;
	const target = blue(`http://${port}`);

	console.log(`🚀 gRPC product server ready at ${target}`);
	server.start();
};

module.exports = main;




