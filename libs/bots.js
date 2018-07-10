let BUTTON_TYPES = {
	show_block: 'block_name',
	web_url: 'url',
	json_plugin_url: 'url',
	phone_number: 'phone_number'
}

let createBtn = (button) => {
  let [title, btn_type, value] = button.split('|');
  let type = btn_type.toLowerCase();
  let type_name = BUTTON_TYPES[type];
  let btn = { title, type, [type_name]: value }
  return btn;
}

let createButtonMessage = (text, ...btns) => {
	let buttons = btns.map(createBtn);

	let payload = {
		text,
		buttons,
		template_type: 'button'
	}

	let attachment = {
		payload,
		type: 'template'
	}

	return { attachment };
}

let createQuickReplyMessage = (text, ...btns) => {
  let buttons = btns.map(btn => {
    let [title, type, value] = btn.split('|');
    
    if (type === '') {
      return { title, block_names: value };
    }
    
    let type_name = 
    return { title, type, [ }
  });
}

let createGallery = (elements, image_aspect_ratio = 'horizontal') => {
	//check for errors in "elements"
	let payload = {
		template_type: 'generic',
		image_aspect_ratio,
		elements
	}

	let attachment = {
		payload,
		type: 'template'
	}

	return { attachment };
}

let createMultiGallery = (elements, split_count = 10, image_aspect_ratio = 'horizontal') => {
  let galleryArray = [];

  while (elements.length > 0) {
    galleryArray.push(
      createGallery(elements.splice(0, split_count))
    );
  }

  return galleryArray;
}

let createImage = (url) => {
	let attachment = {
		type: 'image',
		payload: { url }
	}

	return { attachment };
}

let createTextMessage = (text) => {
	return { text };
}

module.exports = {
  createBtn,
  createButtonMessage,
  createGallery,
  createMultiGallery,
  createImage,
  createTextMessage,
}