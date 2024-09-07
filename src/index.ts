import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import studentRoute from './routes/studentRouter';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));
app.use('/static',express.static(path.join(__dirname,'../dist/public')));
console.log(path.join(__dirname,'../dist/public'));

app.use('/',studentRoute);

mongoose.connect(process.env.mongoose_uri as string)
.then(() => console.log('connect'))
.catch(() => console.log('noconnect'))

app.listen(port,() => {
    console.log(`http://localhost:${port}`)
});