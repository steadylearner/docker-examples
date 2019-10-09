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
