import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../assets/default_image.svg'
const ImageGenerator = () => {
    const [Image_url,setImage_url] = useState('/');
    let inputRef = useRef(null)
    const Imagegen = async ()=>{
        if(inputRef.current.value === ''){
            return 0;
        }
        const response = await fetch(
            'https://api.openai.com/v1/images/generations',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    // Authorization:
                    // 'bearer ',
                    // 'User-Agent':'Chrome'
                },
                body:JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n:1,
                    size:'512x512',
                }),
            }
        );
        let data = await response.json()
        console.log(data)
    }
    return (
        <div className='ai-image-generator'>
            <div className='header'>ai image <span>generator</span></div>
            <div className='img-loading'>
                <div className='image'><img src={Image_url === '/'?default_image:Image_url} alt="" /></div>
            </div>
            <div className='search-box'>
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to see' />
                <button className='generate-btn' onClick={()=>{Imagegen()}}>Generate Image</button>
            </div>
        </div>
    )
}

export default ImageGenerator
