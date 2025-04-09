const Click = require("../models/Click");
const ShortUrl = require("../models/ShortUrl");

exports.getAnalytics = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Validate shortCode exists
    const shortUrl = await ShortUrl.findOne({ shortCode });
    if (!shortUrl) {
      return res.status(404).json({ message: "Short link not found" });
    }

    // Get total click count for pagination
    const totalClicks = await Click.countDocuments({ shortCode });

    // Get paginated clicks (latest first)
    const paginatedClicks = await Click.find({ shortCode })
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    // Get all clicks (for daily/device/browser stats)
    const allClicks = await Click.find({ shortCode });

    // === DAILY CLICK STATS ===
    const dailyClicks = {};
    allClicks.forEach((click) => {
      const date = click.timestamp.toISOString().split("T")[0];
      dailyClicks[date] = (dailyClicks[date] || 0) + 1;
    });

    // === DEVICE STATS ===
    const deviceStats = {};
    const browserStats = {};
    allClicks.forEach((click) => {
      const device = click.device || "Unknown";
      const browser = click.browser || "Unknown";
      deviceStats[device] = (deviceStats[device] || 0) + 1;
      browserStats[browser] = (browserStats[browser] || 0) + 1;
    });

    // === Response ===
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

      recentClicks: paginatedClicks,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalClicks / limit),
        totalClicks,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
