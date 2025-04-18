import { Link } from "react-router-dom";

function Button({ to, children, className = "" }) {
  if (to) {
    return (
      <Link to={to}>
        <button
          className={`btn cursor-pointer w-full sm:max-w-[400px] 2xl:max-w-[500px] 2xl:py-4 bg-[#EC0000] font-medium montserrat_font_500 mt-auto px-5 py-3 rounded-[10px] transition ${className}`}
        >
          {children}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`btn  cursor-pointer w-full sm:max-w-[400px] 2xl:max-w-[500px] 2xl:py-4 bg-[#EC0000] text-white font-medium montserrat_font_500 px-5 py-2 rounded-[10px] transition ${className}`}>
        {children}
      </button>
    );
  }
}

export default Button;