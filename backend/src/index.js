const app = require('./server');

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Local server listening on port ${port}`);
});