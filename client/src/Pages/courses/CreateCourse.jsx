import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewCourse } from "../../../Redux/Slices/CourseSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });
  function handleImageUpload(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          thumbnail: uploadImage,
        });
      });
    }
  }
  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  console.log(userInput)

  async function onFormSubmit(e) {
    e.preventDefault();
    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.createdBy ||
      !userInput.thumbnail
    ) {
      toast.error("All fields are required!");
      return;
    }
    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      navigate("/courses");
    }
  }
  return (
    <div>
      <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col justify-center p-4 gap-5 rounded-lg text-white w-[700px] relative shadow-[0_0_10px_black]"
          >
            <Link className="absolute top-8 text-2xl text-accent cursor-pointer">
              <AiOutlineArrowLeft />
            </Link>
            <h1 className="text-center text-2xl font-bold ">
              Create New Course
            </h1>
            <main className="grid grid-cols-2 gap-x-10">
              <div className="gap-y-6">
                <div>
                  <label htmlFor="image_uploads" className="cursor-pointer">
                    {userInput.previewImage ? (
                      <img
                        src={userInput.previewImage}
                        className="w-full h-44 m-auto border"
                      />
                    ) : (
                      <div className="w-full h-44 m-auto flex items-center justify-center border">
                        <h1 className="font-bold text-lg ">
                          upload your course thumbnail
                        </h1>
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    id="image_uploads"
                    accept=".jpg, .jpeg, .png"
                    name="image_uploads"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="title">course title</label>
                  <input
                    type="text"
                    required
                    name="title"
                    id="title"
                    placeholder="Enter course title ..."
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.title}
                    onChange={handleUserInput}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                  <label htmlFor="createdBy">course Instructor</label>
                  <input
                    type="text"
                    required
                    name="createdBy"
                    id="createdBy"
                    placeholder="Enter course instructor ..."
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.createdBy}
                    onChange={handleUserInput}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="category">course category</label>
                  <input
                    type="text"
                    required
                    name="category"
                    id="category"
                    placeholder="Enter course category ..."
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.category}
                    onChange={handleUserInput}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="description">course description</label>
                  <textarea
                    type="text"
                    required
                    name="description"
                    id="description"
                    placeholder="Enter course description ..."
                    className="bg-transparent px-2 py-1 h-24 overflow-y-scroll border resize-none"
                    value={userInput.description}
                    onChange={handleUserInput}
                  />
                </div>
              </div>
            </main>
            <button type="submit" className="w-full rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 py-2 hover:scale-95 transition-all ease-in-out duration-300"> 
                Create Course
            </button>
          </form>
        </div>
      </HomeLayout>
    </div>
  );
};

export default CreateCourse;
