const express = require('express');

const app = express();
app.use(express.json());

const restPORT = 3000;

const usuarios = [];
const archivos = [];

function agregarArchivos(usuario, arrayArchivos){
    let encontrado = false;
    for(let i = 0; i < archivos.length; i++){
        if(archivos[i].username == usuario){
            for(let j = 0; j < arrayArchivos.length; j++){
                if(!archivos[i].listaArchivos.includes(arrayArchivos[j])){
                    archivos[i].listaArchivos.push(arrayArchivos[j]);
                }
            }
            encontrado = true;
            break;
        }
    }
    if(!encontrado){
        archivos.push({
            username: usuario,
            listaArchivos: arrayArchivos
        });
    }
}

app.post('/receive-login', (req,res) => {
    let { username, password, uri } = req.body;
    
    if(username && password && uri){
        usuarios.push({
            username,
            password,
            uri
        });
        console.log(usuarios)
        res.status(200).send("Cuenta creada correctamente!");
    } else {
        res.status(400).send("Error a la hora de iniciar sesion!");
    }
})

app.post('/receive-indexar', (req,res) => {
    let { username, listaArchivos } = req.body;
    if(listaArchivos && username){
        agregarArchivos(username, listaArchivos);
        res.status(200).send("archivos agregados");
        console.log(archivos);
    }
})

app.post('/receive-logout', (req,res) => {
    let { username } = req.body;

    const indexUsuarios = usuarios.findIndex((usuario) => usuario.username == username);
    const indexArchivos = archivos.findIndex((usuario) => usuario.username == username);
    if(indexUsuarios == -1){
        res.send("usuario no encontrado");
    } else if(indexArchivos == -1){
        usuarios.splice(indexUsuarios, 1);
        res.send("sesion cerrada correctamente");
    } else {
        usuarios.splice(indexUsuarios, 1);
        archivos.splice(indexArchivos, 1);
        res.send("sesion cerrada correctamente");
    }
    
})

app.post('/receive-buscar-archivo', (req,res) => {
    let { archivo } = req.body;
    const peersConArchivo = archivos.filter((peers) => peers.listaArchivos.includes(archivo));
    if(peersConArchivo.length === 0){
        res.send("No existe ese archivo");
    } else {
        res.send(peersConArchivo);
    }
})

/*app.post('/info-usuario', (req,res) => {
    let { username } = req.body;
    console.log(username);
    let usuario = usuarios.find((user) => user.username == username);
    let uriUsuario = usuario.uri;
    res.send(uriUsuario);
})*/

app.post('/info-usuario', (req,res) => {
    let { archivo } = req.body;
    const peersConArchivo = archivos.filter((peers) => peers.listaArchivos.includes(archivo));
    let username = peersConArchivo[0].username;
    let usuario = usuarios.find((user) => user.username == username);
    let uriUsuario = usuario.uri;
    res.send(uriUsuario);
}) 

app.listen(restPORT, () => {
    console.log(`listening on port ${restPORT}`)
  });


