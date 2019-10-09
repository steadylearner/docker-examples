// https://github.com/mysticatea/eslint-plugin-node/blob/v10.0.0/docs/rules/no-unpublished-require.md
const test = require("tape");

const assert = require("assert");

require('dotenv').config({ path: ".env" }); // It uses releative path and called at server/user.js and server/product.js

const { user_product_grpc } = require("../grpc_client");

const moment = require("moment");

const chalk = require("chalk");

test("test getUser after createUser", done => {
	const random = require('crypto').randomBytes(10).toString('hex');
	const today = moment(new Date()).format("YYYY-MM-DD");

	let newUser = {
		"id": random,
		"first_name": random,
		"last_name": random,
		"date_of_birth": today,
	};

	user_product_grpc.createUser(newUser, (createUserError, createdUser) => {
		if (!createUserError) {
			console.log('The user(his birthday is today) was created successfully', createdUser);

			user_product_grpc.getUser({ "id": random }, (getUserError, user) => {
				if (!getUserError) {
					const blue = chalk.blue;
					const msg = blue("Should return 200 OK");
					console.log("[GET] user", user);
					assert.strictEqual(createdUser.id, user.id);

					done.pass(msg);
					done.end();

				} else {
					done.fail(getUserError);
				}
			});
		}
		else {
			done.fail(createUserError);
		}
	});
});

test("test getProdcut with the manual postgresql data", done => {
	const id = "expensive"; // product id
	user_product_grpc.getProduct({ id }, (getProductError, product) => {
		if (!getProductError) {
			const blue = chalk.blue;
			const msg = blue("Should return 200 OK");

			console.log(product);
			assert.strictEqual(id, product.id);

			done.pass(msg);
			done.end();

		} else {
			done.fail(getProductError);
		}
	});
});

