import { fetchDOM } from './fetchData';
import { Category } from './entity/Category';
import { Method } from './entity/Method';
import { Content } from './entity/Content';
import { Variable } from './entity/Variable';
import { Method2Var } from './entity/Method2Var';
import {createConnection, getRepository} from "typeorm";

const dbInit = async () => createConnection({
    type: "sqlite",
    database: "db.sqlite3",
    logging: false,
    synchronize: true,
    entities: [
        Category,
        Method,
        Content,
        Variable,
        Method2Var
    ]
})
.then(async ()=>{
    const methodRepository = getRepository(Method);
    const categoryRepository = getRepository(Category);
    const contentRepository = getRepository(Content);
    const variableRepository = getRepository(Variable);
    const m2vRepository = getRepository(Method2Var);
    const data = 
        (await fetchDOM('https://tc39.es/ecma262/'))
            .filter(dataRow=>dataRow.index.length);
    const categories = [...new Set(data.map(method=>method.category))];
    for (const category of categories) {
        const catRow = new Category();
        catRow.name = category;
        await categoryRepository.save(catRow);
    }
    const variables = [...new Set(data.map(method=>method.vars).flat())];
    for (const variable of variables) {
        const varRow = new Variable();
        varRow.name = variable;
        await variableRepository.save(varRow);
    }
    for (const method of data) {

                const mRow = new Method();
                mRow.name = method.name;
                mRow.category_id = (await Category.findOne({ name: method.category}))?.id || 0;
                await methodRepository.save(mRow);

                const contRow = new Content();
                contRow.method_id = (await Method.findOne({ name: method.name}))?.id || 0;
                contRow.header = method.header;
                contRow.description = method.description;
                await contentRepository.save(contRow);
                
            for (const v of method.vars) {
                const m2vRow = new Method2Var();
                m2vRow.method_id = (await Method.findOne({ name: method.name}))?.id || 0;
                m2vRow.variable_id = (await Variable.findOne({ name: v}))?.id || 0;
                await m2vRepository.save(m2vRow);
            }
    }
})
.catch(error => console.log(error));

export { dbInit };