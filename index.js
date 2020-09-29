/*
  Starting point of backend
*/
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import morgan from 'morgan';
const api = express();

morgan(':method :url :status :res[content-length] - :response-time ms')
// const Util = require('./common/util');
// const log = Util.prefixedLogger("[app]");

// if (process.env.DEBUG_ENABLE) {
//   ("Debug Enabled");
// }

//Setup cors
api.use(cors());

//Setup body parser
api.use(bodyParser.json());//Parse json
api.use(bodyParser.urlencoded({ extended: true }));//Parse nested

//Allow HTTP verbs when client doesn't support them
api.use(methodOverride((req) => {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		const method = req.body._method;
		delete req.body._method;
		return method;
	}
}));
//Echo
const routerEcho = express.Router();
routerEcho.use((req, res) => {
	res.status(200).json({ message: "Server is working" });
});
api.use('/echo', routerEcho);
// const userRoute = require("./routes/userRoute");
// app.use("/user", userRoute);
// const asmRoute = require("./routes/asmRoute");
// app.use("/asm", asmRoute);
// const isaRoute = require("./routes/isaRoute");
// app.use("/isa", isaRoute);

//Not Found
const routerNotFound = express.Router();
routerNotFound.use((req, res) => {
	res.sendStatus(404);
});
api.use(routerNotFound);

//Start listening
const port = 3000;//process.env.PORT ||
api.listen(port, () => {
	console.log(`Listening on port ${port}`);
});