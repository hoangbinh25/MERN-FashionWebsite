const transactionService = require("../services/transactionService");

const proxyGetTransactions = async (req, res) => {
  const result = await transactionService.proxyGetTransactions(req.query);
  if (result.status === "OK") {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
};

module.exports = {
  proxyGetTransactions,
};
