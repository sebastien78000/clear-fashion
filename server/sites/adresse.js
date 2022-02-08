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



    return $('.product-container')
    .map((i, element) => {
      const link = $(element)
      .find('a.product-name')
      .attr("href");
      if(link!=undefined)
      {

      
      return {
        link,
        'brand': 'adresse',
        'price': parseInt($(element)
            .find('.right-block span.price.product-price')
            .text())
        ,
        'name': $(element)
            .find('.right-block .product-name-container.versionpc a.product-name')
            .text()
            .trim()
            .replace(/\s/g, ' '),
        'photo':$(element)
        .find('.product_img_link')
        .attr('src'),
        '_id': uuidv5(link, uuidv5.URL),
        'date':Date.now()
      };

      }
    })
    .get();
};

const parseLength = data => {
  var $ = cheerio.load(data);
  return $('.showall')
    .map((i, element) => {
      const lengthE =parseInt($(element)
        .find('.hidden')
        .attr('value')
        );
      return lengthE;
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
      const len=parseLength(body);
      console.log(len[0]);
      
      const response2 = await fetch(`https://adresse.paris/630-toute-la-collection?id_category=630&n=${len[0]}`);
      body2= await response2.text();
      return parse(body2);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
