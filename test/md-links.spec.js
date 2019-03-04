const mdLinks = require('../main.js');
const chai = require('chai')


describe('mdLinks', () => {

  it('Deberia ser una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });


  it('Debería retornar los links, validation, rutas y textos de los archivos .md de ./pruebafinal', async()=>{
    const data = await mdLinks('./pruebafinal')
    let resultSearch = 
    [ { Link:
     'https://www.google.com/search?q=markdown&oq=markdown&aqs=chrome..69i57j69i60l3j69i59l2.3855j1j4&sourceid=chrome&ie=UTF-8',
    'Validación': 'Ok',
    Ruta:
     '/Users/anagalvez/Documents/Laboratoria/Javascript/Markdown/SCL007-md-links/pruebafinal/carpeta_auxiliar/oliprueba.md',
    Texto: 'link' },
  { Link: 'https://github.com/anagalvez/dfmdslf',
    'Validación': 'Link no encontrado',
    Ruta:
     '/Users/anagalvez/Documents/Laboratoria/Javascript/Markdown/SCL007-md-links/pruebafinal/carpeta_auxiliar/oliprueba.md',
    Texto: 'github Ana Galvez' },
  { Link: 'https://github.com/',
    'Validación': 'Ok',
    Ruta:
     '/Users/anagalvez/Documents/Laboratoria/Javascript/Markdown/SCL007-md-links/pruebafinal/md.md',
    Texto: 'github' } ]

    expect(data).toEqual(resultSearch)

  });

})