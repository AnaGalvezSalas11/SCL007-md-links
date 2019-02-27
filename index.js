//debo exportar una función mdLink OK
//mdLinks(path, options), interfaz del modulo OK
//--validate: Booleano que determina si se desea validar los links encontrados.
//sudo npm update -g "nombre de modulo" (para instalar nuestro modulo)

//#!/usr/bin/env node

'use strict';


let pathlink = require('path')
let fs = require('fs')
let markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch')
const chalk = require('chalk');


function mdLink(path, options) {
    let absolutePath = pathlink.resolve(path);
    let extension = pathlink.extname(path);

    

    if (extension === '.md') {
        let markdown = fs.readFileSync(absolutePath).toString();
        let links = markdownLinkExtractor(markdown);


        const linkPromise = links.map(function (link) {

            return new Promise((resolve, reject) => {

                
                fetch(link)
                    .then((response) => {
                        
                        if (response.status === 200) {
                            resolve({
                                "Link": link,
                                "Validation": "Ok",
                                "Ruta": absolutePath,
                            })
                        }
                        else {
                            resolve({
                                "link": link,
                                "validation": "No existe",
                                "Ruta": absolutePath,
                            })
                        }
                    })
                    .catch(err =>{
                        resolve({
                            "link": link,
                            "validation": 'No existe',
                            "Ruta": absolutePath,
                        })
                    })
                //console.log(link);
            });
        });

        Promise.all(linkPromise)
            .then(showLink => {
                console.log (showLink)})
            .catch((err) => {
                console.log('error')
            })

    }
    else{
        console.log (chalk.green.bold('Este arhivo no es extensión md'))}    
}

mdLink(process.argv[2]);
