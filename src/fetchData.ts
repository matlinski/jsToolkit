import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import e = require('express');

const header2category = (header: string) => (header.startsWith('get '))
    ?header.substring(header.indexOf(' ')+1, header.indexOf('.'))
    :header.substring(0, header.indexOf('.'));
const header2name = (header: string)=> (header.match(/\W/))
    ?header.substring(header.indexOf('.', header.indexOf('.')+1) + 1, header.indexOf(' ', header.indexOf('.')))
    :header.substring(header.indexOf('.', header.indexOf('.')+1) + 1);

const fetchDOM = async (url: string)=>{
    const html = await fetch(url)
        .then(res=>res.text());
    const $ = cheerio.load(html);

    const formatData = (header: Cheerio, section: Cheerio | undefined): {
        index: string,
        header: string,
        name: string,
        category: string,
        description: string
        vars: string
    } => {
        const headerVars = header.find('var').toArray().map(el=>$(el).text());
        const headerId = header.find('span').text();
        header.find('span').text('');
        const headerText = header.text().trim();
        const paragraphText = (typeof section !== 'undefined')
            ?section.find('p').text()
            :'';
        if(!headerText.match(/\.prototype\./)) return{
            index: '',
            header: '',
            name: '',
            category: '',
            description: '',
            vars: ''
        };
        return {
            index: headerId,
            header: headerText,
            name: header2name(headerText),
            category: header2category(headerText),
            description: paragraphText,
            vars: JSON.stringify(headerVars)
        };
    }


    const sections = $('emu-clause[id*=".prototype."]').toArray();
    const data: {
        index: string,
        header: string,
        name: string,
        category: string,
        description: string
        vars: string
    }[] = [];
    for (const section of sections) {
        const subsections = $(section).find('emu-clause')
        if(subsections.length > 1) {
            subsections.each((i, subsection)=>{
                const firstHeader = $(subsection).find('h1').first();
                data.push(formatData(firstHeader, undefined));
            })
        }   else    {
            const header = $(section).find('h1');
            if(header.length > 1){
                const firstHeader = header.first();
                data.push(formatData(firstHeader, undefined));
            }   else    {
                data.push(formatData(header, $(section)));
            }

        }
    }
    return data;
};

export { fetchDOM };
