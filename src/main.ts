import * as express from "express";
import { dbInit } from "./db";
import { renderStyles } from "./renderStyles";

const app = express();
app.set('views', 'views');
app.set('view engine', 'pug');



const port = 3000;
const shouldDbInit = false;

app.get('/', (req, res)=>{
    renderStyles();
    res.render('main');
});
app.use('/', express.static('public'))
app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
});

(async () =>{
    if(shouldDbInit){
        await dbInit();
    }
});
