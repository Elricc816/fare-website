export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.counterapi.dev/v1/farewaves/visits/up"
    );

    const data = await response.json();

    console.log("CounterAPI response:", data);

    const visits =
      data?.count ??
      data?.value ??
      data?.data?.count ??
      data?.data?.value ??
      data?.data;

    res.status(200).json({
      success: true,
      visits: Number(visits) || 0
    });
  } catch (error) {
    console.error("Visit counter error:", error);

    res.status(500).json({
      success: false,
      visits: 0
    });
  }
}
