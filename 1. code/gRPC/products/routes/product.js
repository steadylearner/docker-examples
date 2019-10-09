// https://github.com/prisma/graphql-request

const express = require('express');
const router = express.Router();

const {
	product_grpc,
	// user_grpc,
	user_product_grpc,
} = require("../grpc_client"); // It doesn't work with relative path when test

const { isBirthday, isBlackFriday, dateTodayWithoutYear } = require("../lib");

const productsWithDiscount = (pct, products) => {
	const payload = products.map(product => {
		// eslint-disable-next-line no-unused-vars
		// const { price_in_cents, discount, ...rest } = product; // Make a new discount
		const { price_in_cents, ...rest } = product; // It will work also because it will use discount defined later
		return {
			...rest,
			price_in_cents,
			"discount": {
				pct, // show float value pct.toPrecision(1) or ptc.toFixed(2) if necessary in the client
				// "pct": pct.toPrecision(1),
				"value_in_cents": price_in_cents * pct
			},
		};
	});

	return payload;
};

const normalizePct = (products) => {
	const payload = products.map(product => {
		let { discount, ...rest } = product;
		let { pct, value_in_cents } = discount;
		return {
			...rest,
			"discount": {
				"pct": pct.toPrecision(1),
				value_in_cents,
			},
		};
	});

	return payload;
};

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

module.exports = router;

// router.get("/", (req, res) => {

//   product_grpc.getProducts({}, (error, response) => {
//     if (!error) {
//       console.log('[GET] products');
//       let { products } = response;
//       products = normalizePct(products);

//       // use this instead if you want to test isBlackFriday
//       // if (true) {
//         // console.log("Today is the black friday. Give 10% discount anyway.");

//       // or
//       // if (isBlackFriday([10, 24])) {

//       if (isBlackFriday(dateTodayWithoutYear())) {
//         const pct = "0.1"; // discount
//         products = productsWithDiscount(pct, products);
//         return res.json({ payload: products });
//       } else {
//         const withTargetHeader = req.headers.hasOwnProperty("x-user-id");

//         if (withTargetHeader) {
//           const id = req.headers["x-user-id"];

//           user_product_grpc.getUser({ id }, (error, response) => {
//           // user_grpc.getUser({ id }, (error, response) => {

//             if (!error) {
//               const { date_of_birth } = response;
//               const time = (new Date(date_of_birth)).getTime();

//               if (isBirthday(time)) {
//                 const pct = "0.05"; // discount
//                 products = productsWithDiscount(pct, products);
//                 return res.json({ payload: products });
//               } else {
//                 return res.json({ payload: products });
//               }
//             }
//             else {

//               console.error(error);
//               console.log("Something wrong while requesting user data.");
//               return res.json({ payload: products });
//             }
//           })
//         } else {
//           console.log("There is no X-USER-ID header in this request.");
//           return res.json({ payload: products });
//         }
//       }
//     }
//     else {
//       // 1. error.details: 'failed to connect to all addresses' // server fail
//       // 2. error.datails: 'Not Found' // No record in database yet
//       console.error(error);
//       return res.json({ payload: products });
//     }
//   });

// });