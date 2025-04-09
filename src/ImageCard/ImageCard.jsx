const ImageCard = ({ id, urls, small, regular, likes, description }) => {
  return (
    <div>
      <img src={small} alt={description} />
      <p>Likes: {likes}</p>
      <p>Description: {description}</p>
    </div>
  );
};

export default ImageCard;
