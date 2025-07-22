const ReportService = require('../services/ReportService');

const ReportController = {
  async getAllReports(req, res) {
    try {
      const { filterType, year, month, quarter } = req.query;
      const stats = await ReportService.getDashboardStats({
        filterType,
        year: Number(year),
        month: Number(month),
        quarter: Number(quarter),
      });
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = ReportController;
