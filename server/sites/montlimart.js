const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.category-products')
    .map((i, element) => {
      const link = `https://www.montlimart.com/${$(element)
        .find('.')
        .attr('href')}`;

      return {
        link,
        'brand': 'montlimart',
        'price': parseInt(
          $(element)
            .find('span.price')
            .text()
        ),
        'name': $(element)
          .find('h2.product-name a')
          .text(),
        'photo': $(element)
          .find('.productList-image a')
          .attr('src'),
        '_id': uuidv5(link, uuidv5.URL)
      };
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
