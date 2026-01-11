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
  );
}
