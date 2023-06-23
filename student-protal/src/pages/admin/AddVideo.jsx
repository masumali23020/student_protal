import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/admin/navbar/Navbar";
import AddVideoForm from "../../components/admin/videos/AddVideoForm";
import CancelButton from "../../components/ui/CancelButton";
import FormHeading from "../../components/ui/FormHeading";
import useChangeTitle from "../../hooks/useChangeTitle";


const AddVideo = () => {
  const navigate = useNavigate();
  const changeTitle = useChangeTitle();

  // redirect to videos page on canceled.
  const cancelHandler = () => navigate("/admin/videos");


  // set page title.
  useEffect(() => changeTitle("Admin | Add Video"), []);



  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="w-full px-5 mx-auto md:w-1/2 lg:px-10">
          <div className="relative px-10 py-10 rounded-lg bg-violet-900">
            <FormHeading heading={"Add Video"} />
            <AddVideoForm />
            <CancelButton cancelHandler={cancelHandler} />
          </div>
        </div>
      </section>
    </>
  );
};

export default AddVideo;
