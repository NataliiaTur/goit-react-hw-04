import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!query.trim()) {
      toast.custom((t) => (
        <div className={css.toast}>
          🍞 <span>Can not be empty!</span>
        </div>
      ));
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            name="text"
            value={query}
            onChange={handleChange}
            className={css.inputSearch}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </header>
    </>
  );
};

export default SearchBar;
