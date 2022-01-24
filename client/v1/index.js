// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable
const cheapestTshirt='https://www.loom.fr/collections/tous-les-vetements/products/le-t-shirt';
console.log(cheapestTshirt)


/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable
const lengthMarketPlace=marketplace.length;
console.log(lengthMarketPlace)


// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have
const brandsName=[]
for(let i=0;i<lengthMarketPlace;i++)
{
  brandsName.push(marketplace[i].brand);
}
console.log(brandsName.length)

var brandsNameUnique=new Set(brandsName)
console.log(brandsNameUnique.size)

//MY_FAVORITE_BRANDS.forEach(brand => brandsName.push(brand.name));


// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
function SortPrices(marketplace)
{
  var market= marketplace.slice();
  for(let i=0;i<market.length;i++)
  {
    for(let j=0;j<market.length-1;j++)
    {
      if(market[j].price>market[j+1].price)
      {
         var temp=market[j];
         market[j]=market[j+1];
         market[i]=temp;
      }
    }
  }
  return market
}

var NewMarketplace=SortPrices(marketplace)
console.log(NewMarketplace)

// other possibility
function comparePrice(a,b)
{
  return a.price-b.price;
}

var sortByPrice=marketplace.slice();
sortByPrice.sort(comparePrice)
console.log(sortByPrice)

// other possibility
/*
function sort_by_price(items)
{
  return items.sort(function(a,b)
  {
    return parseFloat(a.price)-parseFloat(b.price);
  })
}
*/

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable
function sortDate(marketplace)
{
  var market= marketplace.slice();
  for(let i=0;i<market.length;i++)
  {
    for(let j=0;j<market.length-1;j++)
    {
      date1 = new Date(market[j].date);
      date2 = new Date(market[j+1].date);
      if(date1>date2)
      {
         var temp=market[j];
         market[j]=market[j+1];
         market[i]=temp;
      }
    }
  }
  return market
}

// other possibility
function compareDate(a,b)
{
  return new Date(a.date)-new Date(b.date);
}

let sortByDate=marketplace.slice();
sortByPrice.sort(comparePrice)
console.log(sortByPrice)



// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list
var productBetween50and100=[]
for(let i=0;i<marketplace.lenght;i++)
{
  if(marketplace[i].price>50 & marketplace[i].price<100) {productBetween50and100.push(marketplace[i]);}
}
console.log(productBetween50and100)


// 🎯 TODO: Average price
// 1. Determine the average price of the marketplace
// 2. Log the average
const reducer = function(previousPrice,current)
{
  return previousPrice+current.price;
}
console.log(marketplace.reduce(reducer,0)/marketplace.length)




/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands
var brandsDict={
  "adresse":[],
  "loom":[],
  "aatise":[],
  "1083":[],
  "dedicated":[]
}

marketplace.forEach(x=>
  {
    brandsDict[x.brand].push(x);
  });
console.log(brandsDict)

let keys = Object.keys(brandsDict);
for (let i=0;i<keys.length;i++)
{
  console.log(keys[i] +" "+ brandsDict[keys[i]].length)
}



// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

function sort_by_price(items)
{
  return items.sort(function(a,b)
  {
    return parseFloat(a.price)-parseFloat(b.price);
  })
}


for (let i=0;i<keys.length;i++)
{
  brandsDict[keys[i]]=sort_by_price(brandsDict[keys[i]])
}
console.log(brandsDict)


// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort


function sort_by_date(items)
{
  return items.sort(function(a,b)
  {
    return new Date(b.date)-new Date(a.date);
  })
}


for (let i=0;i<keys.length;i++)
{
  brandsDict[keys[i]]=sort_by_date(brandsDict[keys[i]])
}
console.log(brandsDict)



/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products
for (let i=0;i<keys.length;i++)
{
  brandsDict[keys[i]]=sort_by_price(brandsDict[keys[i]])
}
console.log(brandsDict)


for (let i=0;i<keys.length;i++)
{
  const index=Math.round(brandsDict[keys[i]].length*0.9)
  console.log("90 percentile for the mark "+keys[i]+" is "+brandsDict[keys[i]][index].price+" euros." )
}




/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
let answer =true;
COTELE_PARIS.forEach(x => 
{
  const timeelapsed = Date.now()
  const actualDate = new Date(timeelapsed)
  if(actualDate-new Date(x.released)>15)
  {
    answer=false;
  }
});
console.log(answer)


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€
answer =true;
COTELE_PARIS.forEach(x => 
{
  if(x.price>100)
  {
    answer=false;
  }
});
console.log(answer)


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
COTELE_PARIS.forEach(x => 
  {
    if(x.uuid=="b56c6d88-749a-5b4c-b571-e5b5c6483131")
    {
      console.log(x);
    }
  });


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

//COTELE_PARIS=COTELE_PARIS.filter(x => x.uuid!="b56c6d88-749a-5b4c-b571-e5b5c6483131") //pas utilisable car cotele_paris est une constante, necessite de creer un nouvel array
var newCoteleParis= COTELE_PARIS.filter(x => x.uuid!="b56c6d88-749a-5b4c-b571-e5b5c6483131")
console.log(newCoteleParis)

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

console.log("jacket")
console.log(jacket)

console.log("blueJacket")
console.log(blueJacket)
// As jacket has been declared as equal to blueJacket with a let, blue jacket has been modified when we change jacket. There are linked to the same memory space

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};




// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties

jacket ={...blueJacket};
// jacket =Object.assign({},blueJacket)
jacket.favorite = true;

console.log("jacket")
console.log(jacket)

console.log("blueJacket")
console.log(blueJacket)


/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
window.localStorage.setItem("MY_FAVORITE_BRANDS",JSON.stringify(MY_FAVORITE_BRANDS));
window.localStorage.getItem("MY_FAVORITE_BRANDS");