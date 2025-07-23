const axios = require("axios");

const URL_SEEPAY = process.env.VITE_API_URL_API_SEEPAY;
const TK_SEEPAY = process.env.VITE_TK_SEEPAY;

const proxyGetTransactions = async (query) => {
  try {
    const response = await axios.get(URL_SEEPAY, {
      headers: {
        Authorization: `Bearer ${TK_SEEPAY}`
      },
      params: query, 
    });
    console.log("DATA TRAN: ", response.data);

    return {
      status: "OK",
      message: "Success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error calling SEEpay:", error.message);
    return {
      status: "ERROR",
      message: "Failed to call SEEpay",
      error: error.message,
    };
  }
};

module.exports = {
  proxyGetTransactions,
};
