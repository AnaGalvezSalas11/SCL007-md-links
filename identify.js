//leer contenido del archivo y reconocer cuales son md
// "use strict";


// let path = require('path')
// let fs = require('fs')
// let markdownLinkExtractor = require('markdown-link-extractor');
// const fetch = require('node-fetch')
// const chalk = require('chalk');




// function archivo() {
// let extention = path.extname(process.argv[2]);
// if(extention === '.md' ){
//     fs.readFile(process.argv[2], 'utf8',(err, data) => {
//         console.log (data) 
//     })
// }
// else{
//     console.log ("Este arhivo no es de extensión md")
// }


// }

// archivo()



// function extract() {

// let extension = path.extname(process.argv[2]);

// if (extension === '.md' ){
//     let markdown = fs.readFileSync('README.md').toString();
//     let links = markdownLinkExtractor(markdown);

//      links.forEach(function (link) {

//     fetch(link)
//     .then((response)=>{
//             if(response.status === 404){
//                console.log (chalk.red.bold(link + "  Página sin servicio")) 
//             }

//             else{
//                 console.log(chalk.blue.bold(link + "  Ok"))
//             }
//         })
//     //console.log(link);
// });
// }

// else{
//     console.log (chalk.green.bold("Este arhivo no es extensión md"))
// }
// }


// extract()





// .then((response)=>{
//     if(response.status === 404){
//        console.log ("Página sin servicio") 
//     }
//     else{
//         console.log("Ok")
//     }
// })
