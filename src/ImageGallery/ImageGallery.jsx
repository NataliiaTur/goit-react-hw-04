import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ images }) => {
  return (
    <div>
      <ul>
        {images.map((image) => {
          return (
            <li key={image.id}>
              <ImageCard
                id={image.id}
                small={image.urlSm}
                regular={image.urlReg}
                likes={image.likes}
                description={image.alt}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageGallery;
