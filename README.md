# Diseño de Apis 

Iniciar proyecto 

```
npm init -y 
```

```
npm install express body-parser
```

instalar nodemon

```
npm install --save-dev nodemon
```

correr el proyecto en puerto 3000

```
node index.js
```

## Modulos nuevos aprendidos

### Underscore (findIndex)

Recorrer un array y devolver el index que cumpla la condicion

```
const _ = require('underscore')
let productos = [ // un array de produtos]
let id = req.params.id

_.findIndex(productos, producto => producto.id == id)
```

