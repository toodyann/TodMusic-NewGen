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
  disabled = false,
  name,
  autoComplete,
  required = false,
  maxLength,
  ...rest
}) {
  return (
    <input
      type={type}
      className={`custom-input ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      name={name}
      autoComplete={autoComplete}
      required={required}
      maxLength={maxLength}
      {...rest}
    />
  );
}
