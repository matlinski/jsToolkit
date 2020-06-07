import { render } from 'node-sass';
import * as fs from 'fs';

const renderStyles = () => {
    render({
        file: 'public/scss/main.scss',
        outputStyle: 'compressed',
        sourceMap: true,
        outFile: 'public/css/main.css'
      },
      (err, result) => { 
          if (err) throw err;
          fs.writeFile('public/css/main.css', result.css, (err) => {
              if (err) throw err;
          });
          fs.writeFile('public/css/main.css.map ', result.map, (err) => {
              if (err) throw err;
          });
      });
}
export { renderStyles };