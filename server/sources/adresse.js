const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  var $ = cheerio.load(data);

  return $('.container')
    .map((i, element) => {
      const name = $(element)
        .find('.right-block .product-name-container.versionpc a.product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      var price =$(element)
        .find('.right-block span.price.product-price')
        .text()
        .replace(' €','');

      price=parseInt(price);
      console.log(price);

      return {name, price};
    })
    .get();
};

const parseLength = data => {
  var $ = cheerio.load(data);

  return $('')
    .map((i, element) => {
      const length = $(element)
        .find('product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');


      return {length};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
