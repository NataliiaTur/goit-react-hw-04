import css from "./ImageCard.module.css";
const ImageCard = ({
  id,
  urls,
  small,
  regular,
  likes,
  description,
  openModal,
}) => {
  return (
    <div className={css.imageCard}>
      <img
        src={small}
        alt={description}
        onClick={() => openModal(regular, description)}
      />
      <p>❤️Likes: {likes}</p>
    </div>
  );
};

export default ImageCard;
