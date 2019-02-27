const fs = require('fs');

fs.readFile("./src/version.json","utf8",(err,data)=> {
  const version = JSON.parse(data);
  const split = version.version.split(".");
  split[2]++;
  version.version = split.join(".");
  fs.writeFile("./src/version.json",JSON.stringify(version),"utf8",()=>{
  });
});
