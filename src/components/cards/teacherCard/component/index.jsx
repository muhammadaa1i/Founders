function TeacherCard({ img, teacher, Experience, position, IELTS, isActive }) {
    return (
        <div className={`bg-white  m-auto max-w-[300px] w-full h-[320px] lg:w-[360px] lg:h-[420px] rounded-[20px] md:rounded-[30px] my-2 p-4 md:p-6 shadow-[0_20px_20px_rgba(255,0,0,0.25)] flex flex-col items-center transition-all duration-500
            ${isActive ? 'scale-120 shadow-2xl' : 'scale-100'}
        `}>
            <div className="lg:w-36 lg:h-36 w-20 h-20 mx-auto overflow-hidden rounded-full border-4 bg-[#EC0000] border-[#EC0000] mb-4 transition-all duration-300 group-hover:border-[#c20000]">
                <img
                    src={img}
                    alt={teacher}
                    className="w-full h-full object-cover object-center lazyload"
                />
            </div>

            <div className="flex flex-col gap-1 md:gap-2 items-center text-center mt-3 flex-1">
                <h1 className="text-xl md:text-2xl font-bold">{teacher}</h1>
                <p className="text-base text-gray-700">
                    Experience: <b>{Experience}</b>
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
