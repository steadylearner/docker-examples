# Use this commands to test end points or your browser.

You can also visit 34.229.244.47/product directly.

1. Without header

```console
$curl 34.229.244.47/product
```

```json
{"payload":[{"id":"expensive","price_in_cents":1000,"title":"product","description":"expensive","discount":{"pct":"0.01","value_in_cents":10}},{"id":"cheap","price_in_cents":800,"title":"another product","description":"cheap","discount":{"pct":"0.01","value_in_cents":8}},{"id":"no-discount","price_in_cents":1000000,"title":"expensive product without","description":"discount","discount":{"pct":"0","value_in_cents":0}}]}
```

2. With header but not birtdhay

```console
$curl -H "x-user-id: steadylearner" 34.229.244.47/product"
```

```json
{"payload":[{"id":"expensive","price_in_cents":1000,"title":"product","description":"expensive","discount":{"pct":"0.01","value_in_cents":10}},{"id":"cheap","price_in_cents":800,"title":"another product","description":"cheap","discount":{"pct":"0.01","value_in_cents":8}},{"id":"no-discount","price_in_cents":1000000,"title":"expensive product without","description":"discount","discount":{"pct":"0","value_in_cents":0}}]}
```

3. With header but birthday

```console
$curl -H "x-user-id: 2019-10-09" 34.229.244.47/product
```

```json
{"payload":[{"id":"expensive","title":"product","description":"expensive","discount":{"pct":"0.05","value_in_cents":50},"price_in_cents":1000},{"id":"cheap","title":"another product","description":"cheap","discount":{"pct":"0.05","value_in_cents":40},"price_in_cents":800},{"id":"no-discount","title":"expensive product without","description":"discount","discount":{"pct":"0.05","value_in_cents":50000},"price_in_cents":1000000}]}
```

If you want to test this for blackfriday, please refer to the source code in **1. code/gRPC/products/routes/product.js**.

```js
router.get("/", (req, res) => {

	product_grpc.getProducts({}, (error, response) => {
		if (!error) {
			console.log('[GET] products');
			let { products } = response;
			products = normalizePct(products);

			// https://eslint.org/docs/rules/no-prototype-builtins
			// const withTargetHeader = req.headers.hasOwnProperty("x-user-id");

			const withTargetHeader = Object.prototype.hasOwnProperty.call(req.headers, "x-user-id");

			if (withTargetHeader) {
				const id = req.headers["x-user-id"];
				user_product_grpc.getUser({ id }, (error, response) => {
					if (!error) {

						// use this instead if you want to test isBlackFriday
						// if (true) {
						// console.log("Today is the black friday. Give 10% discount anyway.");

						// or
						// if (isBlackFriday([10, 24])) {

						if (isBlackFriday(dateTodayWithoutYear())) {
							const pct = "0.1"; // discount
							products = productsWithDiscount(pct, products);
							return res.json({ payload: products });
						} else {

							const { date_of_birth } = response;
							const time = (new Date(date_of_birth)).getTime();

							if (isBirthday(time)) {
								const pct = "0.05"; // discount
								products = productsWithDiscount(pct, products);
								return res.json({ payload: products });
							} else {
								return res.json({ payload: products });
							}
						}
					}
					else {
						console.error(error);
						console.log("Something wrong while requesting user data.");
						return res.json({ payload: products });
					}
				});

			} else {
				console.log("There is no X-USER-ID header in this request.");
				return res.json({ payload: products });
			}
		}
		else {
			// 1. error.details: 'failed to connect to all addresses' // server fail
			// 2. error.datails: 'Not Found' // No record in database yet
			console.error(error);
			return res.json({ error });
		}
	});

});
``` 

## Data for users and products with rds postgresql

1. users

```console
             id             |  first_name  |   last_name    | date_of_birth 
----------------------------+--------------+----------------+---------------
 steadylearner              | steady       | learner        | 2019-01-01
 mybirthdayisblackfriday    | mybirthdayis | blackfriday    | 2019-11-25
 mybirthdayisnotblackfriday | mybirthdayis | notblackfriday | 2019-11-26
 2019-10-09                 | 2019-10-09   | 2019-10-09     | 2019-10-09
 2019-10-10                 | 2019-10-10   | 2019-10-10     | 2019-10-10
 2019-10-11                 | 2019-10-11   | 2019-10-11     | 2019-10-11
 2019-10-12                 | 2019-10-12   | 2019-10-12     | 2019-10-12
```

2. products

```console
     id      | price_in_cents |           title           | description | discount
-------------+----------------+---------------------------+-------------+-----------
 expensive   |           1000 | product                   | expensive   | (0.01,10)
 cheap       |            800 | another product           | cheap       | (0.01,8)
 no-discount |        1000000 | expensive product without | discount    | (0,0)
```

## Requrirments

1. Use gRPC and make two separate serve with it. Then, deploy it with docker containers

2. When user send GET request to /product return products(Birthday 0.05, Blackfirday 0.1).

3. Should work without user gRPC service also.

## Development Process

I used [graphql](https://github.com/steadylearner/Graphql-Express-Postgresql) first to prototype the project and then [gRPC](https://github.com/steadylearner/gRPC-Express-Postgresql) with CRUD operations.

I use **JavaScript, Rust, Python** and thought that **JavaScript** will be useful for this project because your company use Node and go language.

1. Write code in localhost.

2. I used **Tape** for end to end tests because it is faster and **Jest** for general tests and **ESLint** for organization and to find potential problems.

3. Then, I built docker containers for products, users and postgresql.

4. I decided to use aws to deploy them and used aws rds instead of postgresql for simplicity.

5. I uploaded the project with aws cloud formation with ecs-cli and fargate container options.
