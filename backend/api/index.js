const server = require('../src/server');
const { createServer } = require('@vercel/node');

module.exports = async (req, res) => {
    return server(req, res);
};
