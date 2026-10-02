export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.counterapi.dev/v1/farewaves/visits/up"
    );

    const data = await response.json();

    res.status(200).json({
      success: true,
      visits: data.count
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      visits: 0
    });
  }
}
