import React, { useEffect,useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addCourseLectures } from '../../../Redux/Slices/LectureSlice';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import toast from 'react-hot-toast';

const AddLecuture = () => {
    const courseDetail = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInput,setUserInput] = useState({
        id:courseDetail._id,
        lecture:undefined,
        title:'',
        description:'',
        videoSrc:''
    })
    function handleInputChange(e){
        const {name,value} = e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })
    }
    function handleVideoUpload(e){
      const video = e.target.files[0];
      const source = window.URL.createObjectURL(video); 
      setUserInput({
        ...userInput,
        lecture:video,
        videoSrc:source
      })
    }

    async function onFormSubmit(e){
        try {
          e.preventDefault();
        if(!userInput.lecture || !userInput.title || !userInput.description){
            toast.error("All fields are required");
            return;
        }
       
        const res = await dispatch(addCourseLectures(userInput));
        console.log(res)
        if(res?.payload?.success){
          navigate(-1)
          setUserInput({
            id:courseDetail._id,
            lecture:undefined,
            title:'',
            description:'',
            videoSrc:''
          })
        }
        } catch (error) {
          console.log(error)
        }
    }

  useEffect(()=>{
    if(!courseDetail){
      navigate("/courses");
    }
  },[])
  return (
    <HomeLayout>
      <div className='min-h-[90vh] text-white flex flex-col justify-center items-center gap-10 mx-16 '>
        <div className='flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg '>
          <header className='flex items-center justify-center relative '>
            <button className='absolute left-2 text-2xl text-green-500' onClick={()=>navigate(-1)}><AiOutlineArrowLeft/></button>
            <h1 className='text-xl  text-yellow-500 font-semibold '>Add new lecture</h1>
          </header>
          <form onSubmit={onFormSubmit} className='flex flex-col gap-3 '>
            <input type="text" name='title' placeholder='enter the title of the lecture' onChange={handleInputChange} className='bg-transparent px-3 py-1 border' value={userInput.title}/>
            <input type="text" name='description' placeholder='enter the description of the lecture' onChange={handleInputChange} className='bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36' value={userInput.description}/>
            {
              userInput.videoSrc ?(
                <video 
                  muted
                  src={userInput.videoSrc}
                  controls
                  controlsList='nodownload nofullscreen'
                  disablePictureInPicture
                  className='object-fill rounded-tl-lg rounded-tr-lg w-full'
                ></video>
              ):(
                <div className='h-48 border flex items-center justify-center cursor-pointer'>
                  <label htmlFor="lecture">Choose your video</label>
                  <input type="file" className='hidden' id='lecture' name='lecture' onChange={handleVideoUpload} accept='video/mp4 video/x-mp4 video/*'/>
                </div>
              )
            }
            <button type='submit' className='btn btn-primary py-1 font-semibold text-lg'> 
              Add new Lecture
            </button>
          </form>
        </div>

      </div>
    </HomeLayout>
  )
}

export default AddLecuture
