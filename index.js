const express = require('express');
const bodyParser = require('body-parser')

const app = express()

const productos = [
    { id: '123', titulo: 'macbook', precio: 1300, moneda: 'USD' },
    { id: '123', titulo: 'macbook', precio: 1300, moneda: 'USD' },
    { id: '123', titulo: 'macbook', precio: 1300, moneda: 'USD' },
]

app.route('/productos').get((req, res) => { res.json(productos) })

app.get('/productos/:id', (req, res) => {
    for (producto of productos) {
        if (producto.id == req.params.id) {
            res.json(producto)
            return
        }
    }
    res.status(404).send(`El producto con id[${req.params.id}] no existe`)
})


app.get('/', (req, res) => {
    res.send('API activa')
})

app.listen(3000, () => {
    console.log("Escuchando en el puerto 3000")
})