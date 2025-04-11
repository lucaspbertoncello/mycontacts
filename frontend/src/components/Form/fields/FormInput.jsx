import PropTypes from "prop-types";

export default function FormInput({ placeholder, error, onChange }) {
  return (
    <input
      type="text"
      onChange={onChange}
      className={`w-full bg-white outline-0 drop-shadow-sm h-12 rounded-sm px-4 border-2 transition-all
        ${
          error
            ? "border-danger-main focus:border-danger-main text-danger-main"
            : "border-transparent focus:border-main text-font-900"
        }`}
      placeholder={placeholder}
    />
  );
}

FormInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};
