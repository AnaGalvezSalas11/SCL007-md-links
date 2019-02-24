const fetch = require('node-fetch')
//debo exportar una función mdLink
//mdLinks(path, options), interfaz del modulo


//funcion para saber si el link esta roto o no.
fetch('https://github.com/AnaGalvezSalas11/SCL007-md-links/issues/new?milestone=NPM')
// fetch('https://google.cl')
.then((response)=>{
    if(response.status === 404){
       console.log ("Página sin servicio") 
    }
    else{
        console.log("Operativa")
    }
})




