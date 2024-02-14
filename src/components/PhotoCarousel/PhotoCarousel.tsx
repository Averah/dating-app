import React  from 'react';
import { Carousel } from 'antd';
import defaultAvatar from '../../assets/defaultAvatar.png';
import cls from './PhotoCarousel.module.scss';
import { memo } from 'react';

interface IPhotoCarouselProps {
    photos: string[]
}

const PhotoCarousel: React.FC<IPhotoCarouselProps> = memo(({ photos }) => {

    if (photos.length === 0) {
        return <img src={defaultAvatar} alt="Default avatar" className={cls.defaultPhoto} />;
    }

    if (photos.length === 1) {
        return <img src={photos[0]} className={cls.profilePhoto} alt='Profile photo' />;
    }

    return (
        <Carousel className={cls.PhotoCarousel} >
            {photos.map((photo, index) => (
                    <img src={photo} className={cls.photo} key={index} alt={`Photo ${index + 1}`} />
            ))}
        </Carousel>
    );
});

export default PhotoCarousel;
