import express from 'express';
import { textToImage } from './ImageGen.js';

const express = require('express');
const app = express();
const port = 3000;

app.post('/api/image-generator', async (req, res) => {
    try {
        const { prompt } = req.body;
        await textToImage(prompt);
        res.status(200).send('Image generated successfully');
    } catch (error) {
        res.status(500).send('Error generating image');
    };
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})