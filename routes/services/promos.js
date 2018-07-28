let { flattenArray, shuffleArray } = require('../../libs/helpers.js');

let { searchPractices, filterPracticesByService } = require('../../libs/data/practices.js');
let { getPracticePromos } = require('../../libs/data/practice/promos.js');
let { getServiceByID } = require('../../libs/data/services.js');

let { toGalleryElement } = require('../../libs/promos/promos.js');
let { createGallery } = require('../../libs/bots.js');

let getServicePromos = async ({ query, params }, res) => {
  let { service_id } = query;
  let { zip_code } = params;

  let service = await getServiceByID(
    { service_id }
  );

  let service_name = service.fields['Name'];

  let practices = await searchPractices(
    { zip_code }
  );

  let practices_with_service = (practices[0]) ? filterPracticesByService(service_name, practices) : [];

  let practice_promos = practices_with_service.map(async practice => {
    let practice_id = practice.id;
    let practice_promos_base_id = practice.fields['Practice Promos Base ID'];
  
    let promos = await getPracticePromos(
      { practice_promos_base_id }
    );

    return promos.map(
      toGalleryElement({ practice_id, practice_promos_base_id })
    );
  });

  let promos = flattenArray(
    await Promise.all(practice_promos)
  );

  if (!promos[0]) {
    let set_attributes = { service_name };
    let redirect_to_blocks = ['No Service Promos'];
  
    res.send({ set_attributes, redirect_to_blocks });
    return;
  }

  let randomPromos = shuffleArray(promos).slice(0, 10);

  let messages = [
    { text: `Here are some promos I found near ${zip_code} for ${service_name}` }, 
    createGallery(randomPromos)
  ];

  res.send({ messages });
}

module.exports = getServicePromos;