//leer contenido del archivo y reconocer cuales son md

let path = require('path')
let fs = require('fs')


let extention = path.extname(process.argv[2]);
if(extention === '.md' ){
    fs.readFile(process.argv[2], 'utf8',(err, data) => {
        console.log (data) 
    })
}
else{
    console.log ("Este arhivo no es de extensión md")
}









