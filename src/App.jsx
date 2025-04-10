import { Toaster } from "react-hot-toast";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast";
import axios from "axios";
import { getImages } from "./components/ApiServices/api";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const data = await getImages(query, page);

        if (data.results.length === 0) {
          toast("No image found of your request!");
          setIsEmpty(true);
          return;
        }

        const preparedImages = data.results.map(
          ({ id, urls, alt_description, likes }) => ({
            id,
            alt: alt_description,
            urlSm: urls.small,
            urlReg: urls.regular,
            likes,
          })
        );

        setImages((prev) => [...prev, ...preparedImages]);
        setTotalPages(data.total_pages);
        setIsVisible(page < data.total_pages);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError("Network error: Unable to fetch images.");
        } else {
          setError("Unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const handleSearch = (value) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setIsEmpty(false);
    setError(null);
    setIsVisible(false);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = (modalSrc, modalAlt) => {
    setModalIsOpen(true);
    setModalSrc(modalSrc);
    setModalAlt(modalAlt);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && (
        <>
          <ImageGallery images={images} openModal={openModal} />

          {isVisible && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              {isLoadingMore && (
                <BeatLoader
                  color="#36d7b7"
                  size={12}
                  style={{ marginBottom: "10px" }}
                />
              )}
              <LoadMoreBtn
                onClick={() => setPage((prev) => prev + 1)}
                disabled={isLoadingMore}
              />
            </div>
          )}
        </>
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalSrc}
        alt={modalAlt}
      />

      <Toaster />
    </>
  );
}

export default App;
