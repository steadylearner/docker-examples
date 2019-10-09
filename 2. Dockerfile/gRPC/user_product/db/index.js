// https://github.com/motdotla/dotenv#path
// node index.js first to verify it work after you follow REAMDE.md instruction with
// require('dotenv').config({ path: "../../.env" })

// require('dotenv').config({ path: ".env" }); // It uses releative path and called at server/user.js and server/product.js

const { Client } = require("pg");

// Use ENVIRONMENT or env-file from docker-compose.yml instead of .env
/* eslint-disable */
const GRPC = process.env.GRPC;
/* eslint-disable */



const client = new Client(GRPC);
client.connect();

// https://node-postgres.com/guides/project-structure
module.exports = {
    query: (text, params, callback) => {
        return client.query(text, params, callback)
    },
}


