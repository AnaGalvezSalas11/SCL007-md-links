//--validate: Booleano que determina si se desea validar los links encontrados.
//sudo npm update -g "nombre de modulo" (para instalar nuestro modulo)

// #!/usr/bin/env node

'use strict';


const pathlink = require('path')
const fs = require('fs')
const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch')
const chalk = require('chalk');

//agregar segundo parametro: option
function mdLink(path, option) {
    const absolutePath = pathlink.resolve(path);
    const extension = pathlink.extname(path);
    const directorygetIn = fs.statSync(path) 
    const travelDirectory = directorygetIn.isDirectory()

    if (extension === '.md') {
        let markdown = fs.readFileSync(absolutePath).toString();
        let links = markdownLinkExtractor(markdown);

        const linkPromise = links.map ((link) => {
            return new Promise((resolve, reject) => {

                fetch(link.href)
                    .then((response) => {

                        if (response.status === 200) {
                            resolve({
                                "Link": link.href,
                                "Validación": "Ok",
                                "Ruta": absolutePath,
                                "Texto": link.text,
                                
                            })
                        }
                        else {
                            resolve({
                                "Link": link.href,
                                "Validación": "Link no encontrado",
                                "Ruta": absolutePath,
                                "Texto": link.text,
                            })
                        }
                    })
                    .catch(err => {
                        resolve({
                            "Link": link,
                            "Validación": 'Link no encontado',
                            "Ruta": absolutePath,
                            "Texto": link.text,
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
        })).then(arrTotal => {
            let emptyarr = []

            for (let i= 0 ; i < arrTotal.length; i++){
                emptyarr = emptyarr.concat(arrTotal[i])
                }

            return emptyarr;
        })


        )

    } else {
        return Promise.resolve([]);


    }

}

if (require.main === module)
    mdLink(process.argv[2]).then(console.log);

module.exports = mdLink;