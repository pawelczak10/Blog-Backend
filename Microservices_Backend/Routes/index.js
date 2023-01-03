const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    return res.status(200).json({"msg": "Hello Routes"})
})

app.listen(8002, () => {
    console.log('Routes is listening to port 8002')
})