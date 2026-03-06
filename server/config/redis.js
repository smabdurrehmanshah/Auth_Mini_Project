import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URI,
});

redisClient.on("error", (err) => {
  console.log("Redis Error", err);
});

await redisClient.connect();

export default redisClient;
