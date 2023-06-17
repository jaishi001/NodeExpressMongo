const { createClient } = require("redis");
const { REDIS_HOST, REDIS_PORT } = require("../credentials/credentials");
const options = {
  port: REDIS_PORT,
  host: REDIS_HOST,
};
const redisClient = createClient(options);
redisClient.connect();
redisClient.on("connect", function () {
  console.log("REDIS CLIENT CONNECTED");
});

redisClient.on("ready", function () {
  console.log("REDIS CLIENT READY TO USE");
});

redisClient.on("error", function (error) {
  console.log(`REDIS CLIENT ERROR ${error.message}`);
});

redisClient.on("end", function () {
  console.log("REDIS DISCONNECTED");
});

// process.on("SIGINT", function () {
//   redisClient.disconnect();
// });

module.exports = redisClient;
