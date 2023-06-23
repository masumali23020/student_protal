// RTK query hooks.
import { useGetVideosQuery } from "../../../redux/features/videos/videosAPI";

// react components.
import Video from "./Video";
import Message from "../../ui/Message";
import LoadingSpinner from "../../ui/LoadingSpinner";

const PlayList = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30 scroll-bar">
      <div>
        {/* loading spinner */}
        {isLoading && <LoadingSpinner />}

        {/* error message */}
        {!isLoading && isError && (
          <Message message={"Failed to fetch playList ☹"} color="red" />
        )}

        {/* empty message */}
        {!isLoading && !isError && Boolean(!videos?.length) && (
          <Message message={"Playlist is empty 👻"} />
        )}
      </div>

      {/* video playlist */}
      {videos?.map((video, index) => (
        <Video key={index} video={video} />
      ))}
    </div>
  );
};

export default PlayList;
