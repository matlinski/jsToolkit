import * as express from "express";
import { fetchDOM } from './fetchData';

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
});

fetchDOM('https://tc39.es/ecma262/');