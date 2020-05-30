import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import e = require('express');


const fetchDOM = async (url: string)=>{
    const html = await fetch(url)
        .then(res=>res.text());
    const $ = cheerio.load(html);
    const sections = $('emu-clause emu-clause').toArray();
    for (const section of sections) {
        const header = $(section).find('h1');
        const headerText = header.text();
        if(!headerText.includes('prototype')) continue;
        const headerId = header.find('span').text();
        const paragraphText = $(section).find('p').text();
        console.log(headerText);
    }
};

export { fetchDOM };
