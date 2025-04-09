import { Toaster } from "react-hot-toast";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import { useState, useEffect } from "react";
import ImageGallery from "./ImageGallery/ImageGallery";
import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast";
import axios from "axios";
import { getImages } from "./ApiServices/api";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./ErrorMessage/ErrorMessage";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
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
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const handleSearch = (value) => {
    setIsLoading(true);
    setQuery(value);
    setPage(1);
    setImages([]);
    setIsEmpty(false);
    setError(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && (
        <div>
          <BeatLoader color="#36d7b7" size={50} />
        </div>
      )}

      {images.length > 0 && (
        <>
          <ImageGallery images={images} />
          {isVisible && (
            <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
          )}
        </>
      )}

      {error && <ErrorMessage />}

      <Toaster />
    </>
  );
}

export default App;
