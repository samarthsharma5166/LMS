import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import toast from 'react-hot-toast';

const EditProfile = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        previewImage: "",
        fullName: "",
        avatar:undefined,
        userId:useSelector((state)=>state.auth.data._id)
    });
    function handleImageUpload(e) {
      e.preventDefault();
      const uploadImage = e.target.files[0];
      if(uploadImage){
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener('load',function(){
          setData({
            ...data,
            avatar:uploadImage,
            previewImage:this.result
          })
        })
      }
    }

    function handleInputChange(e){
      const{name,value} = e.target;
      setData({
        ...data,
        [name]:value
      })
    }

   async function onFormSubmit(e){
      e.preventDefault();
      console.log(data)
      try {
        console.log("updating..")
      if(!data.fullName || !data.avatar){
        toast.error("Please fill all the fields");
        return;
      }
      if(data.fullName.length < 5){
        toast.error("Name should be atleast 5 character long");
        return;
      }
      const formData = new FormData();
      formData.append("fullName",data.fullName);
      formData.append("avatar",data.avatar);
      console.log(formData.entries().next())
      const id = data.userId;
      await dispatch(updateProfile({id,formData}));
      await dispatch(getUserData());
      navigate('/user/profile');
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <HomeLayout>
      <div className='flex items-center justify-center h-[100vh]'>
        <form onSubmit={onFormSubmit} className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]'>
          <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>
          <label className='cursor-pointer' htmlFor='image_uploads'>
            {
              data.previewImage ? (
                <img src={data.previewImage} alt="profile" className='w-28 h-28 rounded-full m-auto' />
              ) : (
                <BsPersonCircle className='w-28 h-28 rounded-full m-auto ' />
              )
            }
          </label>
          <input 
            onChange={handleImageUpload}
            className='hidden'
            type='file'
            id='image_uploads'
            accept='.png,.jpg,.jpeg,.svg'
          />
          <div className='flex flex-col gap-1'>
            <label htmlFor="fullName" className=''>Full Name</label>
            <input type="text" required name='fullName' id="fullName" placeholder='Enter your name' className='bg-transparent px-2 py-1 border' value={data.fullName} onChange={handleInputChange} />
          </div>
          <button className='w-full bg-yellow-600 hover:bg-yellow-500  transition-all ease-in-out duration-300 rounded-sm font-semibold text-center py-2 text-lg cursor-pointer' type='submit'>
            Update profile
          </button>
          <Link to={'/user/profile'}>
            <p className='link text-accent cursor-pointer flex items-center justify-center w-full gap-2'>
              <AiOutlineArrowLeft/> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  )
}

export default EditProfile
