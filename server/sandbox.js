/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimart= require('./sources/montlimart');
const adresse= require('./sources/adresse');
const fetch = require('node-fetch');
const fs = require('fs').promises;
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');
const { range } = require('express/lib/request');
var pages=['https://www.dedicatedbrand.com/en/men/news','https://www.montlimart.com/toute-la-collection.html?limit=all']


async function sandbox () {
  const eshop=["https://www.dedicatedbrand.com/en/men/news","https://www.montlimart.com/toute-la-collection.html?limit=all","https://adresse.paris/630-toute-la-collection"]
  var products=[]
  try {
    
    /*
    console.log(`🕵️‍♀️  browsing ${eshop[0]} source`);
    const products1 = await dedicatedbrand.scrape(eshop[0]);
    //console.log(products);
    console.log('done');*/
    
    console.log(`🕵️‍♀️  browsing ${eshop[1]} source`);
    const products1 = await montlimart.scrape(eshop[1]);
    //console.log(products);
    console.log('done');
    
    
    console.log(`🕵️‍♀️  browsing ${eshop[2]} source`);
    const products2 = await adresse.scrape(eshop[2]);
    //console.log(products);
    console.log('done');
    
    console.log(`🕵️‍♀️  browsing ${eshop[0]} source`);
    const response = await fetch(`https://www.dedicatedbrand.com/en/loadfilter`);
    const body = await response.json();
    console.log(body.products.length)
    const products3=[]
    for(let i=0;i<body.products.length;i++)
    {
      if (body.products[i].name!=undefined)
      {
        const link=`https://www.dedicatedbrand.com/en/${body.products[i].canonicalUri}`
        //var price=parseString(body.products[i].price.price).replace(' EUR','')
        var temp=(body.products[i].price.price).toString().replace('EUR','')
        products3.push({"link":link,"brand":"dedicated","name":body.products[i].name,"price":parseFloat(temp),'image':body.products[i].image[0],'id':uuidv5(link, uuidv5.URL),"date":Date.now()})
      }
    }
    //console.log(prod)
    console.log('done');
    

    var finalProducts=products1.concat(products2,products3);
    const finalProductsString=JSON.stringify(finalProducts)

    await fs.writeFile('dataBrands.json', finalProductsString,function (err)
    {
      if (err) return console.log(err);
    })



    
    



    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}



const [,, eshop] = process.argv;

sandbox();
