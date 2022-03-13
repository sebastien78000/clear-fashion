const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {MongoClient} = require('mongodb');
const products=require("./dataBrands.json")
const MONGODB_URI = 'mongodb+srv://SebBuquet:Ma99Seb00@clearfashiondata.dfypd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'ClearFashionData';
const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products/:id', (request, response) => {
	var url=request.url
	var components = url.split("/");
	var res=productsById(components[components.length-1]).then(res => response.send(res));
});

app.get('/search', (request, response) => {
	let brand=request.query.brand;
	let price=request.query.price;
	let limit=request.query.limit;
	console.log(brand)
	console.log(price)
	console.log(limit)
	var res=searchProducts(brand,price,limit).then(res => response.send(res));

});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

const productsById = async(id)=>
{
	const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
	db =  client.db(MONGODB_DB_NAME)
	collection = db.collection('products')
	const products = await collection.find({"_id":id}).toArray();
	console.log(products);
	return products
}

const productsLessThanAprice = async(price)=>
{
	const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
	db =  client.db(MONGODB_DB_NAME)
    collection = db.collection('products')
    const products = await collection.find({price:{$lt:price}}).toArray();
	return products
}

const searchProducts = async(brand,val,limitation)=>
{
	let b=[]
	if (brand===undefined) {b=["dedicated","adresse","montlimart"];}
	else {b.push(brand);}
	
	let v=0
	if (val===undefined) {v=1000000000000;}
	else {v= val}
	
	let l=0
	if (limitation===undefined) {l=12;}
	else {l=parseInt(limitation)}
	
	const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
	db =  client.db(MONGODB_DB_NAME)
    collection = db.collection('products')
    const products = await collection.find({brand:{$in :b}},{price:{$lt:v}}).limit(l).toArray();
    return products;
}


