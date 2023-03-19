const Checkbox = ({ className = "", checked = false, onChange, ...props }) => {
  return (
    <>
      <input
        type="checkbox"
        {...(checked && { checked })}
        onChange={onChange}
        className="hidden"
        {...props}
      />
      <div
        className={`w-6 h-6 border border-gray-300 rounded-sm ${
          checked ? "bg-blue-500" : ""
        } flex items-center justify-center ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18.707 3.293a1 1 0 011.414 1.414l-11 11a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414l4.293 4.293 10-10z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </>
  );
};

export default Checkbox;
