import * as express from "express";
import { fetchDOM } from './fetchData';
import { Category } from './entity/Category';
import { Method } from './entity/Method';

import {createConnection, getRepository} from "typeorm";

const shouldInsertCategories = false;
const shouldInsertMethods = false;

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


createConnection({
    type: "sqlite",
    database: "db.sqlite3",
    logging: false,
    synchronize: true,
    entities: [
        Category,
        Method
    ]
})
.then(async ()=>{
    const methodRepository = getRepository(Method);
    const categoryRepository = getRepository(Category);
    const data = 
        (await fetchDOM('https://tc39.es/ecma262/'))
            .filter(dataRow=>dataRow.index.length);
    if(shouldInsertCategories){
        const categories = [...new Set(data.map(method=>method.category))];
        for (const category of categories) {
            const cRow = new Category();
            cRow.name = category;
            await categoryRepository.save(cRow);
        }
    }
    if(shouldInsertMethods){
        const methods = [...new Set(
            data.map(
                method=>({
                    category: method.category,
                    name: method.name
                })
            )
        )];
        for (const method of methods) {
            const mRow = new Method();
            mRow.name = method.name;
            mRow.category_id = (await Category.findOne({ name: method.category}))?.id || 0;
            console.log({ name: method.category });
            console.log(await Category.findOne({ name: 'Object.prototype.' }));
            await methodRepository.save(mRow);
        }
    }

    console.log(await Category.find());
    console.log(await Method.find());
})
.catch(error => console.log(error));