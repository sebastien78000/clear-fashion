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

  return $("li[class='item']")
    .map((i, element) => {
      const link = $(element)
        .find('.product-name a')
        .attr('href');
      
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
          .text()
          .trim()
          .replace(/\s/g, ' '),
        'photo': $(element)
          .find('.product-image img')
          .attr('src'),
          
        '_id': uuidv5(link, uuidv5.URL),
        'date':Date.now()
        
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
