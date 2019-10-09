// https://github.com/motdotla/dotenv#path
// node index.js first to verify it work after you follow REAMDE.md instruction with
// require('dotenv').config({ path: "../../.env" })

// Comment it because we will use docker-compose.yml and other env files instead of .env to set environment variables. 
// require('dotenv').config({ path: ".env" }); // It uses releative path and called at server/user.js and server/product.js

const { Client } = require("pg");

const GRPC = process.env.GRPC;
const client = new Client(GRPC);
client.connect();

// https://node-postgres.com/guides/project-structure
module.exports = {
	query: (text, params, callback) => {
		return client.query(text, params, callback);
	},
};


