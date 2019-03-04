# Extract Link Markdown

## Introducción


Extract Link Markdown es un modulo que te permitirá recorrer tu directorio local y reconoce todos los archivos de formato .md (más conocidos como los README.md). Una vez encontrado los archivos, extrae todos los links e informa si están funcionando o no.


Este modulo además de mostrar el link encontrado, te permite conocer en detalle la ruta del archivo dónde se extrae, si esta "Ok" y el texto que acompaña el link en el Readme.



## ¿Como instalarlo?


Este modulo lo puedes instalar de la siguiente manera:


* Desde la terminal debes posicionarte en la carpeta donde está ubicado tu proyecto


* Luego debes escribir npm install https://github.com/AnaGalvezSalas11/SCL007-md-links.git 


Este modulo también lo puedes usar directamente desde tu archivo donde estas programando, exportándolo de la siguiente manera:


**const extract_link_markdown = require('extract_link_markdown')**


## ¿Como se usa Extract Link Markdown ?


Desde la terminal desde escribir lo siguiente


node (nombre de tu archivo.js) (directorio o archivo que quieres analizar)


Ejemplo: 


Si tu archivo desde donde exportaste se llama index.js y quieres analizar una carpeta llamada "proyecto" debes ingresar lo siguiente:


node index.js ./proyecto


Si quieres analizar sólo un archivo y se llama README.md debes ingresar lo siguiente desde la terminal y al igual que lo anterior debes señalar el archivo desde donde estas programando, en este caso sería index.js


node index.js README.md