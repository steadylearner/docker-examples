# Use this commands to test end points or your browser.

1. Without header

```console
$curl aws/product
```

```json
{"payload":[{"id":"expensive","price_in_cents":1000,"title":"product","description":"expensive","discount":{"pct":"0.01","value_in_cents":10}},{"id":"cheap","price_in_cents":800,"title":"another product","description":"cheap","discount":{"pct":"0.01","value_in_cents":8}},{"id":"no-discount","price_in_cents":1000000,"title":"expensive product without","description":"discount","discount":{"pct":"0","value_in_cents":0}}]}
```

2. With header but not birtdhay

```console
$curl -H "x-user-id: steadylearner" aws/product
```

```json
{"payload":[{"id":"expensive","price_in_cents":1000,"title":"product","description":"expensive","discount":{"pct":"0.01","value_in_cents":10}},{"id":"cheap","price_in_cents":800,"title":"another product","description":"cheap","discount":{"pct":"0.01","value_in_cents":8}},{"id":"no-discount","price_in_cents":1000000,"title":"expensive product without","description":"discount","discount":{"pct":"0","value_in_cents":0}}]}
```

3. With header but birthday

```console
$curl -H "x-user-id: 2019-10-09" aws/product
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

