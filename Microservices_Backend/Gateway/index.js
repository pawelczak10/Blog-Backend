const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/Places', proxy('http://localhost:8001'))
app.use('/Routes', proxy('http://localhost:8002'))
app.use('/Users', proxy('http://localhost:8003'))


app.listen(8000, () => {
    console.log('Gateway is listening to port 8000')
})