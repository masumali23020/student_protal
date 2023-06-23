import { Link, useParams } from "react-router-dom";

const Video = ({ video }) => {
  const { id, title, duration, views } = video || {};

  const { id: videoId } = useParams();

  const nowPlaying = videoId == id ? "bg-slate-700" : "";

  return (
    <Link to={`/course-player/${id}`}>
      <div
        className={`w-full flex flex-row gap-2 cursor-pointer ${nowPlaying} hover:bg-slate-800 p-2`}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-sky-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
            />
          </svg>
        </div>

        <div clas="flex flex-col w-full">
          <p className="text-sm font-medium text-slate-50">{title}</p>
          <div>
            <span className="mt-1 text-xs text-gray-400">{duration} Mins</span>
            <span className="mt-1 text-xs text-gray-400"> | </span>
            <span className="mt-1 text-xs text-gray-400">{views} views</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Video;
