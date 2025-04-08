const Click = require("../models/Click");
const ShortUrl = require("../models/ShortUrl");

exports.getAnalytics = async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Validate shortCode exists
    const shortUrl = await ShortUrl.findOne({ shortCode });
    if (!shortUrl)
      return res.status(404).json({ message: "Short link not found" });

    const clicks = await Click.find({ shortCode }).sort({ timestamp: -1 });

    const totalClicks = clicks.length;

    // Group by date (for line chart)
    const dailyClicks = {};
    clicks.forEach((click) => {
      const date = click.timestamp.toISOString().split("T")[0];
      dailyClicks[date] = (dailyClicks[date] || 0) + 1;
    });

    // Optional: breakdown by device and browser
    const deviceStats = {};
    const browserStats = {};
    clicks.forEach((click) => {
      const device = click.device || "Unknown";
      const browser = click.browser || "Unknown";

      deviceStats[device] = (deviceStats[device] || 0) + 1;
      browserStats[browser] = (browserStats[browser] || 0) + 1;
    });

    res.json({
      shortCode,
      originalUrl: shortUrl.originalUrl,
      customAlias: shortUrl.customAlias || null,
      totalClicks,
      createdAt: shortUrl.createdAt,
      expiresAt: shortUrl.expiresAt,

      dailyClicks,
      deviceStats,
      browserStats,
      recentClicks: clicks.slice(0, 10),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
