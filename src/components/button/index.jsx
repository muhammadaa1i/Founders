import { Link } from "react-router-dom";

function Button({ to, children, className = "" }) {
  if (to) {
    return (
      <Link to={to}>
        <button
          className={`btn w-full max-w-[230px] sm:max-w-[350px] 2xl:max-w-[470px] 2xl:py-4 bg-[#EC0000] font-medium montserrat_font_500 mt-auto px-5 py-2 rounded-xl transition ${className}`}
        >
          {children}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`btn max-w-[230px] w-full sm:max-w-[350px] 2xl:max-w-[470px] 2xl:py-4 bg-[#EC0000] text-white font-medium montserrat_font_500 px-5 py-2 rounded-xl transition ${className}`}>
        {children}
      </button>
    );
  }
}

export default Button;