export default async function handler(req, res) {
  const USER_ID = "1530872106399567941";
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

  if (!BOT_TOKEN) {
    return res.status(500).json({
      error: "DISCORD_BOT_TOKEN is not configured"
    });
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/users/${USER_ID}`,
      {
        headers: {
          Authorization: `Bot ${BOT_TOKEN}`
        }
      }
    );

    const user = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(user);
    }

    if (!user.banner) {
      return res.status(200).json({
        banner: null
      });
    }

    const extension = user.banner.startsWith("a_")
      ? "gif"
      : "png";

    const banner =
      `https://cdn.discordapp.com/banners/${USER_ID}/${user.banner}.${extension}?size=1024`;

    return res.status(200).json({
      banner
    });

  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch Discord profile"
    });
  }
}
