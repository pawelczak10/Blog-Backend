const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    return res.status(200).json({"msg": "Hello Users"})
})

app.listen(8003, () => {
    console.log('Users is listening to port 8003')
})