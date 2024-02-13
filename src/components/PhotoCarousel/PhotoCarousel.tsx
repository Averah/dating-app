import React from 'react';
import { Carousel } from 'antd';
import cls from './PhotoCarousel.module.scss';


interface IPhotoCarouselProps {
    photos: string[]
}

const PhotoCarousel: React.FC<IPhotoCarouselProps> = ({ photos }) => {

    return (
        <Carousel className={cls.PhotoCarousel}>

            {photos.map((photo, index) => (
                <img key={index} className={cls.photo} src={photo} alt="user photo" />
            ))}
        </Carousel>
    );
};

export default PhotoCarousel;