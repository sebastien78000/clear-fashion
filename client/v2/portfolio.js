//Features:
//done: 0,1,2,3,4,5,6 8,9, 10,11,12

// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
var currentProducts = [];
var currentFavorites ="";
var currentPagination = {};
var currentBrand="";
var lastReleasedDateVar=new Date("1901-10-01");
var meanProduct=0;
var sdProduct=0;
var currentNbNewProducts=0;
var favorites = [];

// inititiate selectors
const selectShow = document.querySelector('#show-select');
const selectSort = document.querySelector('#sort-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const sectionFavorites = document.querySelector('#favorites');
const selectBrands = document.querySelector('#brand-select');
const selectFilter = document.querySelector('#filter-select');
const spanNbProducts = document.querySelector('#nbProducts');
const spanP50 = document.querySelector('#p50');
const spanP90 = document.querySelector('#p90');
const spanP95 = document.querySelector('#p95');
const spanNbNewProducts = document.querySelector('#nbNewProducts');
const spanLastReleaseDate = document.querySelector('#lastReleasedDate');
const spanFavorite = document.querySelector('#favoriteProduct');



/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({products, meta}) => {
	console.log(products);
	console.log(meta);
  currentProducts = products;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */

const fetchProducts2 = async (page = 1, size = 12,brands="") => {
  
  try {
    const response = await fetch(
      `https://clear-fashion-9jifddx12-sebastien78000.vercel.app/search?page=${page}&limit=${size}&brand=${brands}`
    );
    const body = await response.json();
	/*
    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }*/
    currentBrand=brands
    return body;
	
  } catch (error) {
    console.error(error);
	console.log("passeIci");
    return {currentProducts, currentPagination};
  }
};



const SortByDateByPrice=(filter)=>
{
  //var newCurrentProducts=[]

  if(filter=="price-asc")
  {
    currentProducts=currentProducts.sort(function(a,b)
    {
      return parseFloat(a.price)-parseFloat(b.price);
    })
    return currentProducts;
  }
  else if(filter=="price-desc")
  {
    currentProducts=currentProducts.sort(function(a,b)
    {
      return parseFloat(b.price)-parseFloat(a.price);
    })

    return currentProducts;
  }
  else if(filter=="date-asc")
  {
    currentProducts=currentProducts.sort(function(a,b)
    {
      return new Date(b.released)-new Date(a.released) ;
    })
    return currentProducts;
  }
  else if(filter=="date-desc")
  {
    currentProducts=currentProducts.sort(function(a,b)
    {
      return new Date(a.released)-new Date(b.released);
    })

    return currentProducts;
  }
  else {
    return currentProducts;
  }
}

const FilterByRecentProductByReasonnablePrice=(filter)=>
{
  //var newCurrentProducts=[]
  var newCurrentProducts =[];
  if(filter=="price")
  {
    currentProducts.forEach(x =>
      {
        if(x.price<50)
        {
          newCurrentProducts.push(x);
        }
      })
    currentProducts=newCurrentProducts;
    console.log(currentProducts);
    return currentProducts;
  }
  else if(filter=="recent")
  {
    currentProducts.forEach(x =>
      {
        var actualDate = new Date(Date.now());
        actualDate.setDate(actualDate.getDate()-15);
        if(actualDate<new Date(x.released))
        {
          newCurrentProducts.push(x);
        }
      })
    currentProducts=newCurrentProducts;
    return currentProducts;
  }
  else {
    return currentProducts;
  }
}



const lastReleasedDate = async (page = 1, size = 48,brands="")=>
{
  try {
    const response = await fetch(`https://clear-fashion-9jifddx12-sebastien78000.vercel.app/search?page=${page}&limit=${size}&brand=${brands}`);
    const body = await response.json();
    /*if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }*/
    lastReleasedDateVar=new Date("1901-10-01");
    currentBrand=brands;

      console.log("passe");
      for(let i=1;i<=body.meta.pageCount;i++) //number of existing data
      {
        const response = await fetch(`https://clear-fashion-9jifddx12-sebastien78000.vercel.app/search?page=${i}&limit=${size}&brand=${brands}`);
        const body = await response.json();    
        body.products.forEach(x => {
          if(new Date(x.released)>lastReleasedDateVar)
          {
            lastReleasedDateVar=new Date(x.released)
          }
        });
      }
      return {lastReleasedDateVar}
    
    
  } catch (error) {
    console.error(error);
    return {lastReleasedDateVar};
  }
}

const numberOfNewProducts = async (page = 1, size = 48,brands="")=>// products released less than one month ago
{
  try {
    currentNbNewProducts=0;
    const response = await fetch(`https://clear-fashion-9jifddx12-sebastien78000.vercel.app/search?page=${page}&limit=${size}&brand=${brands}`);
    const body = await response.json();
    /*if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }*/
    currentBrand=brands;

      for(let i=1;i<=body.meta.pageCount;i++) //number of existing data
      {
        const response = await fetch(`https://clear-fashion-9jifddx12-sebastien78000.vercel.app/search?page=${page}&limit=${size}&brand=${brands}`);
        const body = await response.json();    
        body.products.forEach(x => {

          var actualDate = new Date(Date.now());
          actualDate.setDate(actualDate.getDate()-30);
          if(actualDate<new Date(x.released))
          {
            currentNbNewProducts=currentNbNewProducts+1;
          }

        });
      }
      //console.log("cnb"+currentNbNewProducts);
      return {currentNbNewProducts}
    
    
    
  } catch (error) {
    console.error(error);
    return {currentNbNewProducts};
  }

}

const percentile = async (page = 1, size = 12,brands="") => // get mean and standard deviation WORK ONLY WHEN NO BRANDS ARE SELECTED
{
  try {
    const response = await fetch(`https://clear-fashion-9jifddx12-sebastien78000.vercel.app/search?page=${page}&limit=${size}&brand=${brands}`);
    const body = await response.json();
    currentBrand=brands;
    /*if (body.success !== true) {
      console.error(body);
      return {meanProduct,sdProduct};
    }*/

    var dataTemp=[] //to stock all the prices
    var nbPage=0;
    var bodyMark={"result":[],"meta":{"count":139,"currentPage":page,"pageSize":size,"pageCount":0}}
    bodyMark.meta.pageCount=Math.ceil(bodyMark.meta.count/bodyMark.meta.pageSize);
    let countData=0;
    // determinate the mean
    for(let i=1;i<=bodyMark.meta.pageCount;i++) //number of existing data
    {
      const response = await fetch(`https://clear-fashion-9jifddx12-sebastien78000.vercel.app/search?page=${page}&limit=${size}&brand=${brands}`);
      const body = await response.json();    
      nbPage=body.meta.pageCount;  
      body.products.forEach(x => {
        dataTemp.push(x.price)
      });
    }
    dataTemp.forEach(x => {meanProduct = meanProduct+x;})
    meanProduct=meanProduct/dataTemp.length;
    // determinate the sd
    for(let i=1;i<=bodyMark.meta.pageCount;i++) //number of existing data
    {
      const response = await fetch(`https://clear-fashion-9jifddx12-sebastien78000.vercel.app/search?page=${page}&limit=${size}&brand=${brands}`);
      const body = await response.json();    
      nbPage=body.meta.pageCount;  
      body.products.forEach(x => {
        sdProduct=sdProduct+(x.price+meanProduct)
      });
      sdProduct=Math.sqrt(sdProduct);
    }
    return {meanProduct,sdProduct}
    
    
    
  } catch (error) {
    console.error(error);
    return {meanProduct,sdProduct};
  }
}



const instantiateFavorite = (fav) =>
{
  window.localStorage.setItem("fav",JSON.stringify(fav));
}





/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
   console.log("products:",products);
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product._id}>
        <span>${product.brand}</span>
        <a href="${product.link}" target="_blank">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);

  
};


const renderActualFavorites =products => {

  console.log("passe2")
  favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  console.log(favorites[0]);
  const fragment2 = document.createDocumentFragment();
  const div2 = document.createElement('div');
  const template2 = favorites
    .map(favorite => {
      return `
      <div class="favorite" id=${favorite._id}>
        <span>${favorite.brand}</span>
        <a href="${favorite.link}" target="_blank">${favorite.name}</a>
        <span>${favorite.price}</span>
      </div>
    `;
    })
    .join('');
  
  div2.innerHTML = template2;
  fragment2.appendChild(div2);
  let sectionActualFavorites = document.querySelector('#favorites-script');
  sectionActualFavorites.innerHTML = '<h3>Actual Favorites</h3>';
  sectionActualFavorites.appendChild(fragment2);

  
};



const renderFavorites = products => {
  var listOfFavorite = document.getElementById('favorites-setup');
  listOfFavorite.options.length=0;
  for (var i = 0; i<products.length; i++)
  {
    var opt = document.createElement('option');
    opt.value = products[i].uuid;
    opt.innerHTML = products[i].name;
    listOfFavorite.add(opt);
  }
};




/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');


  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;



};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = currentPagination.count;//update nb products even when selecting a brand
  spanLastReleaseDate.innerHTML=lastReleasedDateVar.toDateString();

  spanP50.innerHTML=Math.round(meanProduct);
  spanP90.innerHTML=Math.round(meanProduct-1.29*sdProduct);
  spanP95.innerHTML=Math.round(meanProduct-1.69*sdProduct);

  spanNbNewProducts.innerHTML=currentNbNewProducts;

};



const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderActualFavorites(products);
  renderFavorites(products);
  
  
};


/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts2(1, parseInt(event.target.value),currentBrand)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});


selectPage.addEventListener('change', event => {
  fetchProducts2(parseInt(event.target.value), selectShow.value,currentBrand)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectBrands.addEventListener('change', event => {
  fetchProducts2(1,12,event.target.value)
    .then(setCurrentProducts)
    .then(percentile(1,48,event.target.value))
    .then(lastReleasedDate(1,48,event.target.value))
    .then(numberOfNewProducts(1,48,event.target.value))
    .then(() => render(currentProducts, currentPagination));
});
/*
selectFavorites.addEventListener('change', event => {
  instantiateFavorite(currentProduct[event.target.value])
  .then(() => render(currentProducts, currentPagination));
});
*/

selectSort.addEventListener('change', event => {
  fetchProducts2()
    .then(setCurrentProducts)
    .then(() => render(SortByDateByPrice(event.target.value), currentPagination));
  });


selectFilter.addEventListener('change', event => {
  fetchProducts2()
    .then(setCurrentProducts)
    .then(()=>render(FilterByRecentProductByReasonnablePrice(event.target.value), currentPagination));
  }
);




document.addEventListener('DOMContentLoaded', async () => {
  fetchProducts2(1,12,"montlimart")
    .then(setCurrentProducts)
    .then(percentile)
    .then(lastReleasedDate())
    .then(numberOfNewProducts())
    .then(() => render(currentProducts, currentPagination));
});


let button =async function() {
  var listOfItemsForAddingInFavorite = document.getElementById('favorites-setup');
  console.log(listOfItemsForAddingInFavorite.value);
  favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  //console.log(favorites);
  let productToAddFav = favorites.find(product => product._id == listOfItemsForAddingInFavorite.value);

  if (productToAddFav === undefined) {
    const products = await fetchProducts2(currentPagination.currentPage, currentPagination.pageSize,currentBrand);
    productToAddFav = products.result.find(product => product.uuid == listOfItemsForAddingInFavorite.value);

    favorites.push(productToAddFav);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    window.alert(`Le produit ${productToAddFav.name} de la marque ${productToAddFav.brand} vient d'etre ajoute a vos favoris.`);
  }
  else{
    window.alert(`Le produit ${productToAddFav.name} de la marque ${productToAddFav.brand} a deja ete ajoute a vos favoris.`)
  }
}
