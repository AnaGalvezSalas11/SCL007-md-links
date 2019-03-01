//--validate: Booleano que determina si se desea validar los links encontrados.
//sudo npm update -g "nombre de modulo" (para instalar nuestro modulo)

//#!/usr/bin/env node

'use strict';


const pathlink = require('path')
const fs = require('fs')
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch')
const chalk = require('chalk');

//agregar segundo parametro: option
function mdLink(path) {
    const absolutePath = pathlink.resolve(path);
    const extension = pathlink.extname(path);
    const directorygetIn = fs.statSync(path) 
    const travelDirectory = directorygetIn.isDirectory()

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
                                "validation": "Link no encontrado",
                                "Ruta": absolutePath,
                            })
                        }
                    })
                    .catch(err => {
                        resolve({
                            "link": link,
                            "validation": 'Link no encontado',
                            "Ruta": absolutePath,
                        })
                    })
            });
        });


       return Promise.all(linkPromise)
            

    }

    else if (travelDirectory === true) {
        const readDirectory = fs.readdirSync(path)
        return (Promise.all(readDirectory.map((file) => {
            const filesArch = pathlink.join(absolutePath, file)
            //agreagar option
            return mdLink(filesArch);
        })).then(arregloDeArreglos => {
            let emptyarr = []

            for (let i= 0 ; i < arregloDeArreglos.length; i++){
                emptyarr = emptyarr.concat(arregloDeArreglos[i])
                }

            return emptyarr;
        })


        )
        
    } else {
        return Promise.resolve([]);
    }
            // return resultado;
}


if (require.main === module)
    return mdLink(process.argv[2]).then(console.log);

module.exports = mdLink;
