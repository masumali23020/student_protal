import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// RTK query hooks.
import {
  useGetVideosQuery,
  useDeleteVideoMutation,
} from "../../../redux/features/videos/videosAPI";

// react components.
import VideoItem from "./VideoItem";
import Message from "../../ui/Message";
import LoadingSpinner from "../../ui/LoadingSpinner";

// utility functions.
import notify from "../../../utils/notify";

const VideoList = () => {
  const navigate = useNavigate();

  const { data: videos, isLoading, isError } = useGetVideosQuery();
  const [deleteVideo, { isSuccess: deleted, isError: deleteFailed }] =
    useDeleteVideoMutation();

  const addVideo = () => navigate("/admin/videos/add");

  useEffect(() => {
    if (deleted) notify.success("Video deleted successfully");
    else if (deleteFailed) notify.error("Failed to delete video");
  }, [deleted, deleteFailed]);

  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="px-5 py-20 bg-opacity-10">
          <div className="flex w-full">
            <button className="ml-auto btn" onClick={addVideo}>
              Add Video
            </button>
          </div>
          {(isLoading || isError || Boolean(!videos?.length)) && (
            <div className="flex items-center justify-center w-full py-8 mt-4">
              {/* loading spinner */}
              {isLoading && <LoadingSpinner />}

              {/* error message */}
              {!isLoading && isError && (
                <Message message={"Failed to fetch videos ☹"} color="red" />
              )}

              {/* empty message */}
              {!isLoading && !isError && Boolean(!videos?.length) && (
                <Message message={"No Video Available 👻"} />
              )}
            </div>
          )}

          <div className="mt-4 overflow-x-auto border border-slate-800">
            {Boolean(videos?.length) && (
              <table className="w-full text-base divide-gray-600 divide-y-1">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="table-th">Video Title</th>
                    <th className="table-th">Description</th>
                    <th className="table-th">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-600/50">
                  {videos?.map((video) => (
                    <VideoItem
                      video={video}
                      key={video.id}
                      deleteVideo={deleteVideo}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoList;
