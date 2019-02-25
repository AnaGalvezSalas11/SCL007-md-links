//debo exportar una función mdLink
//mdLinks(path, options), interfaz del modulo
//validate: Booleano que determina si se desea validar los links encontrados.
//agregar: bin en el archivo package.json
// #!/usr/bin/env node
//sudo npm update -g "nombre de modulo" (para instalar nuestro modulo)
//funcion para saber si el link esta roto o no.
// fetch('https://google.cl')

"use strict";


let path = require('path')
let fs = require('fs')
let markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch')
const chalk = require('chalk');


function extract() {

    let extension = path.extname(process.argv[2]);
    
    if (extension === '.md' ){
        let markdown = fs.readFileSync('README.md').toString();
        let links = markdownLinkExtractor(markdown);
    
         links.forEach(function (link) {
    
        fetch(link)
        .then((response)=>{
                if(response.status === 404){
                   console.log (chalk.red.bold(link +" "+ chalk.bgWhite("Página sin servicio "))) 
                }
    
                else{
                    console.log(chalk.blue.bold(link +" "+ chalk.bgWhite("Ok")))
                }
            })
        //console.log(link);
    });
    }
    
    else{
        console.log (chalk.green.bold("Este arhivo no es extensión md"))
    }
    }
    
    
    extract()
    
    



