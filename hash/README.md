# Use this commands to test end points or your browser.

You can also visit 34.229.105.117/product directly. The payloads of this proejct will be [1. code/gRPC folder](https://github.com/steadylearner/docker-examples/tree/master/1.%20code/gRPC) and the [docker-compose.yml](https://github.com/steadylearner/docker-examples/blob/master/3.%20docker-compose/gRPC/prod/aws/fargate/docker-compose.yml).

1. Without header

```console
$curl 34.229.105.117/product
```

```json
{"payload":[{"id":"expensive","price_in_cents":1000,"title":"product","description":"expensive","discount":{"pct":"0.01","value_in_cents":10}},{"id":"cheap","price_in_cents":800,"title":"another product","description":"cheap","discount":{"pct":"0.01","value_in_cents":8}},{"id":"no-discount","price_in_cents":1000000,"title":"expensive product without","description":"discount","discount":{"pct":"0","value_in_cents":0}}]}
```

2. With header, but it is not the birthday of the user.

```console
$curl -H "x-user-id: steadylearner" 34.229.105.117/product
```

```json
{"payload":[{"id":"expensive","price_in_cents":1000,"title":"product","description":"expensive","discount":{"pct":"0.01","value_in_cents":10}},{"id":"cheap","price_in_cents":800,"title":"another product","description":"cheap","discount":{"pct":"0.01","value_in_cents":8}},{"id":"no-discount","price_in_cents":1000000,"title":"expensive product without","description":"discount","discount":{"pct":"0","value_in_cents":0}}]}
```

3. With header, but it is the birthday of the user.

```console
$curl -H "x-user-id: 2019-10-10" 34.229.105.117/product
$curl -H "x-user-id: 2019-10-11" 34.229.105.117/product
$curl -H "x-user-id: 2019-10-12" 34.229.105.117/product
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

## Requirements

1. Use gRPC and make two separate services with it for [user, product] and products. Then, deploy them with docker containers.

2. When users send GET request to /product, return products. When it was sent with "x-user-id" header, conditionally give them products with Birthday 5%, Blackfirday 10% discount.

3. **product gRPC service** should work without user service also.

## Development Process

I used [graphql](https://github.com/steadylearner/Graphql-Express-Postgresql) first to prototype the project and then [gRPC](https://github.com/steadylearner/gRPC-Express-Postgresql) with CRUD operations.

I use **JavaScript, Rust, Python** and thought that **JavaScript** will be useful for this project because your company use Node and go language.

1. I coded gRPC Node servers for [user, product] and products with **pg**(postgresql) in the localhost.

2. I used **Tape** for end to end tests for /product because it is faster. Then, I included **Jest** for general tests(including end to end test) and **ESLint** for code organization and to find potential problems.

3. Then, I built docker containers for products, users and postgresql to test it locally with **Dockerfile**, **$docker-compose up -d** and the **docker-compose.yml**.

4. I decided to use aws to deploy them. I used **aws rds postgresql option** instead of **custom postgresql docker container and aws plugin and ebs volumes** for simplicity.

5. I uploaded the project with aws cloud formation with FARGATE container launch options to use awsvpc network mode. I used **ecs-cli** and **docker-compose.yml and ecs-params.yml** from aws.
