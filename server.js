import fs from 'fs';

export const textToImage = async () => {
    const path =
        "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

    const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + process.env.STABILITY_API_KEY,
    }
}