// https://zellwk.com/blog/endpoint-testing/
// https://jestjs.io/docs/en/asynchronous.html
// Jest will wait until the done callback is called before finishing the test.

const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);


const { user_product_grpc } = require("../grpc_client");

const moment = require("moment");

// require('dotenv').config({ path: ".env" }); // It uses releative path and called at server/user.js and server/product.js

describe("Test express with jest and supertest", () => {
	test("GET /product with X-USER-ID header and is birthday", async done => {
		const random = require('crypto').randomBytes(10).toString('hex');
		const today = moment(new Date()).format("YYYY-MM-DD");

		let newUser = {
			"id": random,
			"first_name": random,
			"last_name": random,
			"date_of_birth": today,
		};

		user_product_grpc.createUser(newUser, (error, user) => {
			// user_grpc.createUser(newUser, (error, user) => {
			if (!error) {
				console.log('The user(his birthday is today) was created successfully', user);
			}
			else {
				console.error(error);
			}
		});

		const response = await request
			.get('/product')
			.set("X-USER-ID", random);

		expect(response.status).toBe(200);
		console.log(response.body.payload);

		done();
	});

	test("GET /product with X-USER-ID header and is not birthday", async done => {
		const random = require('crypto').randomBytes(10).toString('hex');
		const yesterday = moment(new Date()).add(-1, "days").format("YYYY-MM-DD");

		let newUser = {
			"id": random,
			"first_name": random,
			"last_name": random,
			"date_of_birth": yesterday,
		};

		user_product_grpc.createUser(newUser, (error, user) => {
			// user_grpc.createUser(newUser, (error, user) => {
			if (!error) {
				console.log('The user(his birthday is not today) was created successfully', user);
			}
			else {
				console.error(error);
			}
		});

		const response = await request
			.get('/product')
			.set("X-USER-ID", random);

		expect(response.status).toBe(200);
		console.log(response.body.payload);

		done();
	});

	test("GET /product without X-USER-ID", async done => {
		const response = await request
			.get('/product');

		expect(response.status).toBe(200);
		console.log(response.body.payload);

		done();
	});
});
