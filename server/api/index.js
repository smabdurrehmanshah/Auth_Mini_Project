import app from "../server.js";

export default async function handler(req, res) {
  // Pass all requests to Express app
  await app(req, res);
}