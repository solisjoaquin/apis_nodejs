const express = require('express');
const bodyParser = require('body-parser')
// unic universal ID
const { v4: uuidv4 } = require('uuid');
const _ = require('underscore')
const productos = require('./database').productos

const app = express()
app.use(bodyParser.json())



app.route('/productos')
    .get((req, res) => { res.json(productos) })
    .post((req, res) => {
        let nuevoProducto = req.body
        if (!nuevoProducto.moneda || !nuevoProducto.precio || !nuevoProducto.titulo) {
            res.status(400).send("Tu producto debe especificar todo los campos")
            return
        }

        nuevoProducto.id = uuidv4()
        productos.push(nuevoProducto)
        res.status(201).json(nuevoProducto)
    })

app.route('/productos/:id')
    .get((req, res) => {
        for (producto of productos) {
            if (producto.id == req.params.id) {
                res.json(producto)
                return
            }
        }
        res.status(404).send(`El producto con id[${req.params.id}] no existe`)
    })
    .put((req, res) => {
        let id = req.params.id
        let reemplazo = req.body

        if (!reemplazo.moneda || !reemplazo.precio || !reemplazo.titulo) {
            res.status(404).send("Tu producto debe especificar todo los campos")
            return
        }

        let indice = _.findIndex(productos, producto => producto.id == id)

        if (indice !== -1) {
            reemplazo.id = id
            productos(indice) = reemplazo
            res.status(200).json(reemplazo)
        } else {
            res.status(404).send(`El producto con id[${req.params.id}] no existe`)
        }
    }).delete((req, res) => {
        let indiceBorrar = _.findIndex(productos, producto => producto.id == req.params.id)

        if (indiceBorrar == -1) {
            res.status(404).send(`El producto con id[${req.params.id}] no existe`)
            return
        }
        let borrado = productos.splice(indiceBorrar, 1)
        res.json(borrado)
    })



app.get('/', (req, res) => {
    res.send('API activa')
})

app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000")
})