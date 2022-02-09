import express from "express";
import bodyParser from "body-parser";
import router from "./router/index.route";
import errorHandler from "./util/errorHandler";
import dotenv from "dotenv";
import path from "path";
import Logger from "./util/logger";
dotenv.config();

const app = express();

// assets files
app.use(express.static(path.join(__dirname, 'public')));

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/", router);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    Logger.debug(`Server is up and running @ http://localhost:${process.env.PORT}`);
});

