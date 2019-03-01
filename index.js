//debo exportar una función mdLink OK
//mdLinks(path, options), interfaz del modulo OK
//--validate: Booleano que determina si se desea validar los links encontrados.
//sudo npm update -g "nombre de modulo" (para instalar nuestro modulo)

//#!/usr/bin/env node

'use strict';


const pathlink = require('path')
const fs = require('fs')
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch')
const chalk = require('chalk');

//agregar segundo parametro
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


        Promise.all(linkPromise)
            .then(showLink => {
                console.log(showLink)
            })
            .catch((err) => {
                console.log('error')
            })

    }

    else if (travelDirectory === true) {
        const readDirectory = fs.readdirSync(path)
        return (Promise.all(readDirectory.map((file) => {
            const filesArch = pathlink.join(absolutePath, file)
            //agreagar option
            return mdLink(filesArch);
        })).then(arregloDeArreglos => {
            //juntar todos los resultados
            console.log(arregloDeArreglos)
            
            // return resultado;
        })


        )
    } else {
        return Promise.resolve([]);
    }
}


if (require.main === module)
    mdLink(process.argv[2]);

module.exports = mdLink;