// Usado em login e  Register
const Button = ({ text, type }) => {
  return (
    <button
      type={type}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {text}
    </button>
  );
};

export default Button;
