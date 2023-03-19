const TextArea = ({ error = "", className = "", placeholder, ...props }) => {
  return (
    <>
      <textarea
        placeholder={placeholder}
        className={`border w-full h-20 text-[#7E8F99] pt-3 p-2   rounded-md ${
          error ? "border-red-500 border-2 bg-red-100/50" : ""
        } ${className}`}
        {...props}
      />
      {error && <span className="text-red-500">{error}</span>}
    </>
  );
};

export default TextArea;
