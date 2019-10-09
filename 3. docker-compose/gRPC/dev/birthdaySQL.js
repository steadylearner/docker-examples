const moment = require("moment");
const today = moment(new Date()).format("YYYY-MM-DD"); 
const payload = `'${today}'`;

console.log("$docker exec -it grpc_postgresql psql -U postgres");
console.log("\\c grpc;");
console.log(`INSERT INTO users VALUES ('mybirthdayistoday', 'mybirthdayis', 'today', ${payload});`);

console.log("\n1. Without header $curl localhost/product");
console.log(`\n{"payload":[{"id":"expensive","price_in_cents":1000,"title":"product","description":"expensive","discount":{"pct":"0.01","value_in_cents":10}},{"id":"cheap","price_in_cents":800,"title":"another product","description":"cheap","discount":{"pct":"0.01","value_in_cents":8}},{"id":"no-discount","price_in_cents":1000000,"title":"expensive product without","description":"discount","discount":{"pct":"0","value_in_cents":0}}]}`)

console.log("\n2. With header $curl -H 'X-USER-ID: mybirthdayistoday' localhost/product");
console.log(`\n{"payload":[{"id":"expensive","title":"product","description":"expensive","discount":{"pct":"0.05","value_in_cents":50},"price_in_cents":1000},{"id":"cheap","title":"another product","description":"cheap","discount":{"pct":"0.05","value_in_cents":40},"price_in_cents":800},{"id":"no-discount","title":"expensive product without","description":"discount","discount":{"pct":"0.05","value_in_cents":50000},"price_in_cents":1000000}]}`)
