const express = require('express');
const router = require('./routes');
const cors = require('cors')

const app = express()
const port = 3000

// middlewares
app.use(express.json())
app.use(cors())

// Route init
router(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);

})