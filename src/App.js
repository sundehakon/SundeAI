import React, { useEffect, useState } from 'react';
import { textToImage } from './server';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    textToImage().then(setImages);
  }, []);

  return (
    <div>
      {images.map((src, index) => (
        <img key={index} src={src} alt="" />
      ))}
    </div>
  );
}

export default App;
