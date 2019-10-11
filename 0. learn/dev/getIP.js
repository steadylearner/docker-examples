// https://docs.docker.com/engine/reference/commandline/inspect/

// It is equivalent to $docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' containerId
// or use bash code similar to this in .bashrc 
// alias getContainerIP=docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'
// $source ~/.bashrc && getContainerIP containerId

// Use $docker inspect containerid > inspect.txt** first.
// Then, $node getIP.js

const fs = require('fs')

const filename = "inspect.txt";

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  
  // console.log(`Read ${filename}`);
  const dataObject = JSON.parse(data);

  // console.log(payload);
  // console.log(typeof payload);

  const ip = dataObject[0].NetworkSettings.IPAddress;
  console.log(`IP is ${ip}`);
});


// NetworkSettings.IPAddress


