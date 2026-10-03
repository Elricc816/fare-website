export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.counterapi.dev/v2/workspaces/fare/counters/visits/up",
      {
        headers: {
          Authorization: `Bearer ${process.env.COUNTERAPI_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    console.log("CounterAPI:", data);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: data,
      });
    }

    res.status(200).json({
      success: true,
      visits: Number(data.value ?? data.count ?? 0),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      visits: 0,
    });
  }
}
