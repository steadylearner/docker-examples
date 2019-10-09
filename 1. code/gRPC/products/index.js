const chalk = require("chalk");
const app = require("./server");
const grpc_server = require("./grpc_server");

const port = 8000;

app.listen(port, () => {
	const blue = chalk.blue;
	const target = blue(`http://localhost:${port}`);
	console.log(`🚀 Express Server ready at ${target}`);
});

grpc_server();
