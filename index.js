const http = require('http');
const mongoose = require('mongoose');
const url = require('url');

const MONGO_URI="mongodb+srv://root:root@cluster0.qbcb1.mongodb.net/MyShop?retryWrites=true&w=majority"

mongoose.connect(MONGO_URI, function(err) {
    if (err) {
        console.log('Hubo un error al conectarse a la base de datos');
    } else {
        console.log('Conectado a la base de datos')
    }
})

const ProductSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number }
});

const ProductModel = mongoose.model('products', ProductSchema);

const server = http.createServer(function (request, response) {
    // Obtiene el querystring de la url
    const $url = url.parse(request.url, true);
    const query = $url.query;

    if (!query.name) {
        ProductModel.find(function(err, documents) {
            response.write(JSON.stringify(documents));
            response.end();
        });
    } else {
        ProductModel.find({ name: new RegExp(query.name, "i") }, function (err, documents) {
            response.write(JSON.stringify(documents));
            response.end();
        });
    }
});

server.listen(process.env.PORT || 3000, function () {
    console.log('Servidor escuchando peticiones');
});