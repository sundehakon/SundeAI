const fs = require('fs');

const textToImage = async () => {

  var userPrompt = prompt("Enter your image prompt: ");

  if (!fs.existsSync('./SundeAI')){
        fs.mkdirSync('./SundeAI');
  }

  const path =
    "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

  const headers = {
    Accept: "application/json",
    Authorization: "Bearer sk-Mf56w61P8rEykhIqe4nk9FisXs16aLmUtIu77eqLbUK5VbZa"
  };

  const body = {
    steps: 40,
	width: 1024,
	height: 1024,
	seed: 0,
	cfg_scale: 5,
	samples: 1,
	text_prompts: [
	  {
	    "text": `${userPrompt}`,
	    "weight": 1
	  },
	  {
	    "text": "blurry, bad",
	    "weight": -1
	  }
	],
  };

  const response = await fetch(
    path,
    {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  
  if (!response.ok) {
    throw new Error(`Non-200 response: ${await response.text()}`)
  }
  
  const responseJSON = await response.json();
  
  responseJSON.artifacts.forEach((image, index) => {
    fs.writeFileSync(
      `./Image/img_${image.seed}.png`,
      Buffer.from(image.base64, 'base64')
    )
  })
};

textToImage();