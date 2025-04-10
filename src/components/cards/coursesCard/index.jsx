
import CourseCard from "./components";

import kid from "/src/assets/kid.avif";
import advanced from "/src/assets/advanced.avif";
import reading from "/src/assets/reading.avif";
import { useEffect } from "react";
import Aos from "aos";
import { useTranslation } from "react-i18next";

function Course() {
  useEffect(() => {
    Aos.init({
      duration: 800,
    });
    Aos.refresh();
  }, []);
  
  const { t, i18n } = useTranslation()
  const ChangeLng = (selectedLanguage) => {
    i18n.changeLanguage(selectedLanguage)
    localStorage.setItem('i18nextLng', selectedLanguage)
  }

  const courseFromData = [
    {
      title: t("Kids English"),
      img: kid,
      timeBold: t("30 soatlik darslar"),
      courseTime: t("(asosiy darslar: haftasiga 2 soat / 3 marta Academic support: haftasiga 2 marta / 30 min)"),
      teacherBold: t("Ikkita o‘qituvchi"),
      teacher: t("(asosiy o‘qituvchidan tashqari Support teacher mavjud)"),
      spanTitleBold: t("Free Sunday Events"),
      spanTitle: t("(har hafta o‘tqaziladigan tadbirlar)"),
      spanParagrfBold: t("Diary"),
      spanParagrf: t("(uyga vazifalarni ko‘rib borish va imtihon natijalarini ko‘rib borish uchun)"),
      cabinetBold: t("Shaxsiy kabinet"),
      cabinet: t("(ota-onalar nazorati uchun shaxsiy kabinet)"),
    },

    {
      title: t("General English"),
      img: advanced,
      timeBold: t("30 soatlik darslar"),
      courseTime: t("(asosiy darslar: haftasiga 2 soat / 3 marta Academic support: haftasiga 2 marta / 30 min)"),
      teacherBold: t("Ikkita o‘qituvchi"),
      teacher: t("(asosiy o‘qituvchidan tashqari Support teacher mavjud)"),
      spanTitleBold: t("Umumiy 6 daraja"),
      spanTitle: t("(Beginnerdan Advancedgacha, har biri 3 oy davom etadi)"),
      spanParagrfBold: t("Free Sunday Events"),
      spanParagrf: t("(har hafta o‘tqaziladigan tadbirlar)"),
      cabinetBold: t("Shaxsiy kabinet"),
      cabinet: t("(ota-onalar nazorati uchun shaxsiy kabinet)"),
    },

    {
      title: t("IELTS"),
      img: reading,
      timeBold: t("30 soatlik darslar"),
      courseTime: t("(asosiy darslar: haftasiga 2 soat / 3 marta Academic support: haftasiga 2 marta / 30 min)"),
      teacherBold: t("Ikkita o‘qituvchi"),
      teacher: t("(asosiy o‘qituvchidan tashqari Support teacher mavjud)"),
      spanTitleBold: t("Free Sunday Events"),
      spanTitle: t("(har hafta o‘tqaziladigan tadbirlar)"),
      spanParagrfBold: t("Bepul konsultatsiya"),
      spanParagrf: t("(IELTS topshirishdan oldin beriladigan foydali tavsiyalar)"),
      cabinetBold: t("Bepul Mock Exam"),
      cabinet: t("(Mock Examni bepul topshirish)"),
    },
  ];

  return (
    <div id="courses" className="py-[20px]">
      <h1
        data-aos='fade-up'
        className="py-[30px] font-[Montserrat] text-[#EC0000] font-bold text-3xl sm:text-4xl xl:text-[50px] leading-[100%] tracking-normal text-center">
        {t("Kurslarimiz")}:</h1>
      <div data-aos='fade-up'
        className="mb-10 px-[20px] flex lg:flex-row flex-col gap-6">
        {courseFromData &&
          courseFromData.map((item) => <CourseCard key={item.title} {...item} />)}
      </div>
    </div>
  );
}

export default Course;
