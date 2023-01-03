const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/places', proxy('http://localhost:8001'))
app.use('/routes', proxy('http://localhost:8002'))
app.use('/api/users', proxy('http://localhost:8003'))


app.listen(8000, () => {
    console.log('Gateway is listening to port 8000')
})