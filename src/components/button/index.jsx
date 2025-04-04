import { Link } from "react-router-dom";

function Button({ to, children, className = "" }) {
  return (
    <Link to={to}>
      <button
        className={`btn max-w-[230px] w-full sm:max-w-[350px] bg-[#EC0000] text-white font-medium montserrat_font_500 mt-4 px-5 py-2 rounded-xl transition ${className}`}>
        {children}
      </button>
    </Link>
  );
}

export default Button;
