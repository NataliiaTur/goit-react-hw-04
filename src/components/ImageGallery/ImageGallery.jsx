import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <div>
      <ul className={css.galleryList}>
        {images.map((image) => {
          return (
            <li key={image.id}>
              <ImageCard
                id={image.id}
                small={image.urlSm}
                regular={image.urlReg}
                likes={image.likes}
                description={image.alt}
                openModal={openModal}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageGallery;
