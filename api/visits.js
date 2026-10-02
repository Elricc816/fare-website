import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const visits = await redis.incr("fare_website_visits");

    res.status(200).json({
      success: true,
      visits
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      visits: 0
    });
  }
}
