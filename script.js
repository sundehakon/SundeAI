require('dotenv').config();
const fs = require('fs');
const readline = require('readline');

const textToImage = async () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const asciiLogo = `
 ░▒▓███████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓███████▓▒░░▒▓████████▓▒░░▒▓██████▓▒░░▒▓█▓▒░ 
 ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░ 
 ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░ 
  ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░ ░▒▓████████▓▒░▒▓█▓▒░ 
        ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░ 
        ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░ 
 ░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓████████▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░
 `;
    console.log(asciiLogo);
    rl.question("Welcome! Please enter your image prompt: ", async (userPrompt) => {
      rl.question("Choose image file: (png or jpeg)?: ", async (imageFile) => {
        if (imageFile !== 'png' && imageFile !== 'jpeg') {
          console.log("Invalid image file. Please choose png or jpeg.");
          rl.close();
        }
        rl.question("Enter folder you want to store images in: ", async (userFolder) => {

            console.log("Starting image generation...");

            if (!fs.existsSync(`${userFolder}`)) {
                fs.mkdirSync(`${userFolder}`);
            }

            const path =
                "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

            const headers = {
                Accept: "application/json",
                Authorization: "Bearer " + process.env.API_KEY
            };

            const body = {
                steps: 40,
                width: 1024,
                height: 1024,
                seed: 0,
                cfg_scale: 5,
                samples: 1,
                text_prompts: [{
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
                path, {
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
              console.log("Saving your image...");
                fs.writeFileSync(
                    `./${userFolder}/img_${image.seed}.${imageFile}`,
                    Buffer.from(image.base64, 'base64')
                )
            })

            rl.close();
            console.log("Image generated!");
        });
    });
  });
};

textToImage();