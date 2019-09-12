// ------------------ Main libraries --------------------
const http = require("http");
const express = require('express');

const rest = require('./router');
const errorHandler = require('./error-handler');
// ------------------ Constants -------------------------
const app = express();

const hostname = process.env.BOOKLING_HOST;
const port = process.env.BOOKLING_PORT;

app.use('/', rest.router);
app.use('/content', rest.media);
app.use(errorHandler.error5xx);


// ------------------ SERVER -----------------------------
app.listen(port, http, () => console.log(`Example app listening on ${hostname}:${port}!`));