function TeacherCard({ img, teacher, experience, position, IELTS, isMiddle }) {
    return (
      <div
        className={`bg-white m-auto max-w-[300px] w-full h-[350px] 
        lg:w-[360px] lg:h-[420px] 2xl:w-[400px] 2xl:h-[450px] 
        rounded-[30px] my-2 p-4 md:p-6 
        shadow-[0px_19.8px_10px_0px_rgba(255,223,223,0.7)_inset] 
        flex flex-col items-center transition-all duration-500 
        overflow-hidden relative before:absolute before:inset-0 
        before:shadow-[0px_19.8px_10px_0px_rgba(255,223,223,0.7)_inset] 
        after:absolute after:inset-0 
        after:shadow-[0px_-19.8px_10px_0px_rgba(255,223,223,0.7)_inset] 
        ${isMiddle ? 'lg:scale-118 lg:z-10 lg:my-14' : 'lg:scale-100 lg:my-12'}
        `}
      >
        <div className="lg:w-36 lg:h-36 w-20 h-20 mx-auto mt-3 overflow-hidden rounded-full border-4 bg-[#EC0000] border-[#EC0000] mb-4">
          <img
            loading="lazy"
            src={img}
            alt={teacher}
            className="w-full h-full object-cover object-center"
          />
        </div>
  
        <div className="flex flex-col gap-1 md:gap-2 items-center text-center mt-3 flex-1">
          <h1 className="text-xl md:text-2xl font-bold">{teacher}</h1>
          <p className="text-base text-gray-700">
            Experience: <b>{experience}</b>
          </p>
          {IELTS && (
            <p className="text-base text-gray-700">
              IELTS: <b>{IELTS}</b>
            </p>
          )}
          <p className="max-w-[80%] text-base text-gray-700">
            Position: <b>{position}</b>
          </p>
        </div>
      </div>
    );
  }
  
  export default TeacherCard;  