const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const USER_PRODUCT_PATH = "./typeDefs/user_product.proto";
const options = require("../options");

const user_productDefinition = protoLoader.loadSync(
	USER_PRODUCT_PATH,
	options
);

const user_product_proto = grpc.loadPackageDefinition(user_productDefinition);

const UserProductService = user_product_proto.UserProductService;

const user_product_grpc = new UserProductService('0.0.0.0:50051', grpc.credentials.createInsecure());

module.exports = user_product_grpc;
