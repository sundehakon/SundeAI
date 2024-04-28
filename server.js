import fs from 'fs';

export const textToImage = async () => {
    const path =
        "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + process.env.STABILITY_API_KEY,
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
                "text": "A painting of a happy dog",
                "weight": 1
            },
            {
                "text": "blurry, bad",
                "weight": -1
            }
        ],
    };

}