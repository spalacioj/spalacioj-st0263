const dotenv = require('dotenv');
const express = require('express');
const axios = require("axios");

dotenv.config();

const REMOTE_HOST = process.env.REMOTE_HOST;


const app = express();
app.use(express.json());

const restPORT = 5000;


app.post('/login', (req,res) => {
    let { username, password, uri } = req.body;
    const data = {
        username: username,
        password: password,
        uri: uri
    }
    axios.post('http://localhost:3000/receive-login', data)
    .then(response => {
        res.send(response.data);
    })
    .catch(error => {
        console.error('Error al enviar datos al servidor:', error);
        res.status(400).send('Error al enviar datos al servidor');
    });
})

app.post('/indexar', (req,res) => {
    let { username, listaArchivos } = req.body;

    const data = {
        username: username,
        listaArchivos: listaArchivos
    }

    axios.post('http://localhost:3000/receive-indexar', data)
    .then(response => {
        res.status(200).send(response.data);
    })
    .catch(error => {
        console.error(error);
        res.status(400).status("error al recibir los archivos")
    })
})

app.post('/logout', (req,res) => {
    let { username } = req.body;
    const data = {
        username: username
    }

    axios.post('http://localhost:3000/receive-logout',data)
    .then(response => {
        res.status(200).send(response.data)
    })
    .catch(error => {
        console.error(error);
        res.status(400).status("Error al cerrar sesion");
    })
})

app.post('/buscar-archivo', (req,res) => {
    let { archivo } = req.body
    const data = {
        archivo: archivo
    }
    axios.post('http://localhost:3000/receive-buscar-archivo', data)
    .then(response => {
        res.status(200).send(response.data)
    })
    .catch(error => {
        console.error(error);
        res.status(400).status("No se encontro el archivo");
    })
})



app.listen(restPORT, () => {
    console.log(`listening on port ${restPORT}`)
  });


