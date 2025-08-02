import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);

  // Fetch All Courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
  };

  // Calculate average rating of course
  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return (totalRating / course.courseRatings.length).toFixed(1);
  };

  // Format total minutes into "X hours Y minutes"
  const formatDuration = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const hourStr = hours > 1 ? `${hours} hours` : hours === 1 ? `1 hour` : "";
    const minuteStr =
      minutes > 1 ? `${minutes} minutes` : minutes === 1 ? `1 minute` : "";

    if (hourStr && minuteStr) return `${hourStr} ${minuteStr}`;
    if (hourStr) return hourStr;
    if (minuteStr) return minuteStr;
    return "0 minutes";
  };

  // Calculate total course duration in formatted string
  const calculateCoursesDuration = (course) => {
    let totalMinutes = 0;
    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        totalMinutes += lecture.lectureDuration;
      });
    });

    return formatDuration(totalMinutes);
  };

  // Calculate duration of one chapter (used elsewhere)
  const calculateChapterTime = (chapter) => {
    let time = 0;

    Array.isArray(chapter?.chapterContent) &&
      chapter.chapterContent.forEach((lecture) => {
        time += lecture.lectureDuration;
      });
    // You can use humanize-duration here or reuse formatDuration if you want consistent format
    return formatDuration(time);
  };

  // Calculate number of lectures in course
  const calculateNoOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isEducator,
    setIsEducator,
    calculateNoOfLectures,
    calculateChapterTime,
    calculateCoursesDuration,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
