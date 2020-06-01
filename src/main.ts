import * as express from "express";
import { fetchDOM } from "./fetchData";
import { Category } from "./entity/Category";

import { createConnection, getRepository } from "typeorm";

const app = express();
const port = 3000;

app.get("/", async (req, res) => res.send());

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

createConnection({
	type: "sqlite",
	database: "db.sqlite3",
	logging: true,
	synchronize: true,
	entities: [Category]
})
	.then(async () => {
		const categoryRepository = getRepository(Category);
		const data = (await fetchDOM("https://tc39.es/ecma262/")).filter(
			dataRow => dataRow.index.length
		);
		const categories = [...new Set(data.map(method => method.category))];
		for (const category of categories) {
			const cRow = new Category();
			cRow.name = category;
			await categoryRepository.save(cRow);
		}
		console.log(await Category.find());
	})
	.catch(error => console.log(error));
