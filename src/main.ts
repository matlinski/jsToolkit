import * as express from "express";
import { fetchDOM } from './fetchData';
import { Method, sequelize } from './db';

const app = express()
const port = 3000

app.get(
    '/',
    async (req, res) => 
        res.send()
)

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
});

(async () =>{
    await sequelize.sync();
    for (const method of await Method.findAll({where: {category: 'Set'}})){
        console.log(method.toJSON());
    }
    // for (const method of await fetchDOM('https://tc39.es/ecma262/')){
    //     if(!method.index.length) continue;
    //     await Method.create(method);
    // }
    // console.log('done');
})();