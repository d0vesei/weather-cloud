// MarsImage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarsImage = () => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const fetchImage = async () => {
            const apiKey = 'b8Yyg3hFIqtijghqCkwGWdlpuh7JHeFdjhcq4jBc';
            const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;

            try {
                const response = await axios.get(url);
                const images = response.data.photos;
                if (images.length > 0) {
                    setImageUrl(images[images.length - 1].img_src);
                }
            } catch (error) {
                console.error('Error fetching Mars image:', error);
            }
        };

        fetchImage();
    }, []);

    return (
        <div>
            {imageUrl && (
                <img src={imageUrl} alt="Mars" style={{ width: '300px', height: 'auto', border: '3px solid #ccc' }} />
            )}
        </div>
    );
};

export default MarsImage;
