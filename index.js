const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const routes = require('./src/routers');
const PORT = process.env.PORT;
app.use(express.json());
app.use(
	cors({
		origin: '*',
	})
);

app.use(routes);
app.get('/', async (req, res) => {
	try {
		res.status(200).json({ status: 'OK', data: 'hello world' });
	} catch (error) {
		res.status(500).json({ messege: 'Internal server error', error });
	}
});

app.listen(PORT, () => {
	console.log(`SERVER RUNNIG ON PORT: ${PORT} `);
});
