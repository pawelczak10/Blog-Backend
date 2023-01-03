const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    return res.status(200).json({"msg": "Hello Places"})
})

app.listen(8001, () => {
    console.log('Places is listening to port 8001')
})