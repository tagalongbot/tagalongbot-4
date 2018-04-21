let { BASEURL } = process.env;
let { createGallery } = require('../libs/bots');
let { shuffleArray } = require('../libs/helpers');

let { getTable, getAllDataFromTable } = require('../libs/data');

// Get Tables
let getServicesTable = getTable('Services');

// Search Methods
let searchPromotions = async (data, search_type) => {
	let { search_promos_state, search_promos_city, search_promos_zip_code, search_promo_code } = data;

  let providers = await searchProviders({
    search_providers_state: search_promos_state, 
    search_providers_city: search_promos_city, 
    search_providers_zip_code: search_promos_zip_code,
  });
  
  let providersBaseIDs = providers.map((provider) => provider.fields['Practice Base ID']);

  let filterByFormula = `AND({Active?}, NOT({Claim Limit Reached}))`;

  let allPromos = [];
  for (let baseID of providersBaseIDs) {
    let promosTable = getPromosTable(baseID);
    let getPromos = getAllDataFromTable(promosTable);
    let promos = await getPromos({ filterByFormula });
    
    allPromos = allPromos.concat(promos);
  }
  
  // Need for searching with By Expiration Date
  // console.log('All Promos', allPromos);
  return allPromos;
}

let toGalleryElement = ({ id: promo_id, fields: promo }) => {
  let title = promo['Promotion Name'].slice(0, 80);
  let subtitle = promo['Terms'];
  let image_url = promo['Image'][0].url;

  let btn1 = {
    title: 'View Promo Details',
    type: 'json_plugin_url',
    url: `${BASEURL}/promo/details?promo_id=${promo_id}`
  }

  let btn2 = {
    title: 'Find Promo Providers',
    type: 'json_plugin_url',
    url: `${BASEURL}/promo/providers?promo_id=${promo_id}`
  }

  let buttons = [btn1, btn2];

  let element = { title, subtitle, image_url, buttons};
  return element;
}

let getServices = async ({ query, params }, res) => {
  let { search_type } = params;

  let first_name = query['first name'];
	let messenger_user_id = query['messenger user id'];

	let promotions = await searchPromotions(query, search_type);

  if (!promotions[0]) {
    let redirect_to_blocks = ['No Promos Found'];
    res.send({ redirect_to_blocks });
    return;
  }

  let textMsg = { text: `Here's are some promotions I found ${first_name}` };
  let randomPromotions = shuffleArray(promotions).slice(0, 10).map(toGalleryElement);
	let promotionsGallery = createGallery(randomPromotions);

	let messages = [textMsg, promotionsGallery];
	res.send({ messages });
}

let handleErrors = (req, res) => (error) => {
  console.log(error);
	let source = 'airtable';
	res.send({ source, error });
}

module.exports = (req, res) => {
	getServices(req, res)

	.catch(
		handleErrors(req, res)
	);
}