const moment = require("moment");
const today = moment(new Date()).format("YYYY-MM-DD"); 
const payload = `'${today}'`;

console.log(`INSERT INTO users VALUES ('mybirthdayistoday', 'mybirthdayis', 'today', ${payload});`);
console.log("$curl -H 'X-USER-ID: mybirthdayistoday' localhost/product");
