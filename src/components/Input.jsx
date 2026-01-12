import "../styles/scss/Header/input.scss";

export default function Input({
  type = "text",
  className = "",
  placeholder = "",
  value,
  onChange,
  onKeyPress,
  onFocus,
  onBlur,
  onSearch,
  onHomeClick,
  disabled = false,
  name,
  autoComplete,
  required = false,
  maxLength,
  ...rest
}) {
  const handleSearch = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
    if (onKeyPress) {
      onKeyPress(e);
    }
  };

  return (
    <div className="search-input-wrapper">
      {onHomeClick && (
        <button className="home-btn" onClick={onHomeClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Додому
        </button>
      )}
      <div className="search-input-container">
        <input
          type={type}
          className={`custom-input ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          name={name}
          autoComplete={autoComplete}
          required={required}
          maxLength={maxLength}
          {...rest}
        />
        {onSearch && (
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={disabled}
            type="button"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
