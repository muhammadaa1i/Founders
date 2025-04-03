import { Link } from "react-router-dom";

function Button({ to, children, className = "" }) {
  if (to) {
    return (
      <Link to={to}>
        <button
          className={`btn w-full bg-[#EC0000] text-white font-medium montserrat_font_500 mt-auto px-5 py-2 rounded-xl transition ${className}`}
        >
          {children}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`btn w-full bg-[#EC0000] text-white font-medium montserrat_font_500 mt-auto px-5 py-2 rounded-xl transition ${className}`}
      >
        {children}
      </button>
    );
  }
}

export default Button;