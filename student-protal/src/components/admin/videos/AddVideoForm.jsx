import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddVideoMutation } from "../../../redux/features/videos/videosAPI";
import notify from "../../../utils/notify";


  
// convert youtub video duration scend 
const YTDurationToSeconds =(duration) => {
  var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  match = match.slice(1).map(function(x) {
    if (x != null) {
        return x.replace(/\D/, '');
    }
  });

  var hours = (parseInt(match[0]) || 0);
  var minutes = (parseInt(match[1]) || 0);
  var seconds = (parseInt(match[2]) || 0);

  return hours * 3600 + minutes * 60 + seconds;
}

const format2 = (n) => `0${n / 60 ^ 0}`.slice(-2) + ':' + ('0' + n % 60).slice(-2)
// convert youtub video viwes scend 
const  kFormatter = (num) =>{
  return Math.abs(num) > 999 ? 
  Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k'
   : 
  Math.sign(num)*Math.abs(num)
}


const AddVideoForm = () => {

  const [title, setTitle] = useState("")
  const [description,  setDescription] = useState("")
  const [url, setLink] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [duration, setDuration] = useState("")
  const [views, setViwes] = useState("");
  

  const [addVideo, {data:vides, isLoading, isSuccess, isError}] = useAddVideoMutation();

  const navigate = useNavigate()


 
// auto input fillup the youtub video link handeler 
  const handleURLChange = (e) => {
      const url = e.target.value;
      setLink(url);
      const extractVideoId = (url) => {
          try {
            const videoId = url.split("embed/")[1].slice(0, 11);
            return videoId;
          } catch (error) {
            console.log(error);
            return;
          }
        };
      const videoId = extractVideoId(url);
      const apiKey = "AIzaSyBHlRuyWYrpcZ681o8x2vg9uvOJIguO0Wc";
      fetch(
       ` https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,statistics,contentDetails`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          
          const video = data?.items[0];
          const title = video?.snippet?.title;
          const description = video?.snippet?.description.split("\n\n")[0];
          const views = video?.statistics?.viewCount;
          const duration = video?.contentDetails?.duration;
          const viewCount = kFormatter(views)
          const created = video?.snippet?.publishedAt;
         
          const asfds = YTDurationToSeconds(duration)
      
          const durationBySwemiclone = format2(asfds)
      
         
          setTitle(title);
          setDescription(description);
          setViwes(viewCount);
          setDuration(durationBySwemiclone);
          setCreatedAt(created);
        });
    };

    useEffect(() => {
      if (isSuccess) {
        navigate("/admin/videos");
        notify.success("Video added successfully");
      } else if (isError) notify.error("Failed to add video");
    }, [isSuccess, isError]);


  //   from  submit handeler 
  const handelSubmit = (e) => {
      e.preventDefault();

      addVideo({
          id:vides?.id,
          title,
          description,
          url,
          createdAt,
          duration,
          views

      })


      
  }

 
  return (
    <form onSubmit={handelSubmit} >
      <div>
         {/* url */}
         <div className="grid grid-cols-1 mt-3 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="url"
              className="block text-sm font-medium leading-6 text-white"
            >
              URL
            </label>
            <div className="mt-1">
              <input
                required
                id="url"
                name="url"
                type="text"
                // autoComplete="url"
                value={url}
                onChange={handleURLChange}
                className="block w-full rounded-md outline-0  py-1.5 border-0 bg-white text-gray-700  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
              />
            </div>
          </div>
        </div>
        {/* title */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-white"
            >
              Title
            </label>
            <div className="mt-1">
              <input
                required
                id="title"
                type="text"
                name="title"
              
                value={title} onChange={e => setTitle(e.target.value)}
                className="block w-full rounded-md outline-0  py-1.5 border-0  bg-white text-gray-700  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
              />
            </div>
          </div>
        </div>

        {/* description */}
        <div className="grid grid-cols-1 mt-3 gap-x-6 gap-y-3 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-white"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                rows={3}
                required
                id="description"
                name="description"
                value={description} onChange={e => setDescription(e.target.value)}
                className="block w-full rounded-md outline-0  py-1.5 border-0  bg-white text-gray-700  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3 resize-none scroll-bar"
              />
            </div>
          </div>
        </div>

       

        <div className="grid grid-cols-1 mt-3 gap-x-6 gap-y-3 sm:grid-cols-6">
          {/* views */}
          <div className="col-span-3">
            <label
              htmlFor="views"
              className="block text-sm font-medium leading-6 text-white"
            >
              Views
            </label>
            <div className="mt-1">
              <input
                required
                id="views"
                type="text"
                name="views"
              
                value={views} onChange={e => setViwes(e.target.value)}
                className="block w-full rounded-md outline-0  py-1.5 border-0  bg-white text-gray-700  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
              />
            </div>
          </div>

          {/* duration */}
          <div className="col-span-3">
            <label
              htmlFor="duration"
              className="block text-sm font-medium leading-6 text-white"
            >
              Duration
            </label>
            <div className="mt-1">
              <input
                required
                id="duration"
                type="text"
                name="duration"
               
                value={duration} onChange={e => setDuration(e.target.value)}
                className="block w-full rounded-md outline-0  py-1.5 border-0  bg-white text-gray-700  focus:ring-2 focus:ring-blue-500 ring-offset-0 px-3"
              />
            </div>
          </div>
        </div>

        {/* submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 mt-5 text-sm font-semibold text-white rounded-md shadow-sm bg-cyan hover:opacity-90 active:opacity-100 disabled:bg-slate-600 disabled:hover:opacity-100"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddVideoForm;
