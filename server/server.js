const {MongoClient} = require('mongodb');
const products=require("./dataBrands.json")
const MONGODB_URI = 'mongodb+srv://SebBuquet:Ma99Seb00@clearfashiondata.dfypd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'ClearFashionData';

let collection=null;
let db=null;

const Connection = async()=>
{
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    db =  client.db(MONGODB_DB_NAME)
    //await productsOfABrand('montlimart');
    //await productsLessThanAprice(10);
    //await productsSortedByDate();
    //await productsSortedByPrice();
    await productsScrapedLessThanTwoWeeksAgo()
    process.exit()
    
}

const importData = async()=>
{
    const collection = db.collection('products')
    const result = collection.insertMany(products)
    console.log(result);
}


const productsOfABrand = async(brand)=>
{
    collection = db.collection('products')
    const products = await collection.find({brand}).toArray();
    console.log(products);
}

const productsLessThanAprice = async(price)=>
{
    collection = db.collection('products')
    const products = await collection.find({price:{$lt:price}}).toArray();
    console.log(products);
}


const productsSortedByPrice = async()=>
{
    collection = db.collection('products')
    const products = await collection.find({}).sort({'price':1}).toArray();
    console.log(products);
}

const productsSortedByDate = async()=>
{
    collection = db.collection('products')
    const products = await collection.find({}).sort({"date":1}).toArray();
    console.log(products);
}


const productsScrapedLessThanTwoWeeksAgo=async()=>
{
    const date=Date.now()
    console.log(date)
    const products = await collection.aggregate([
        {$project:{'_id':1,'brand':1,'price':1,'name':1,'link':1,'photo':1,dateDifference: {$subtract: [ date, "$date" ] }}},
        {$match: {dateDifference:{$lt:1000000000000000000000000000000000}}}
    ]).toArray();
    console.log(products);
}


Connection();