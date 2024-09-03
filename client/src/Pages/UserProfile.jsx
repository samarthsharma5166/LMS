import {useDispatch, useSelector} from 'react-redux'
import HomeLayout from '../Layouts/HomeLayout'
import { Link, useNavigate } from 'react-router-dom';
import { cancelCourseBundle } from '../../Redux/Slices/RazorpaySlice';
import { getUserData } from '../../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data} = useSelector((state)=>state.auth);
  async function handleCancelation(){
    toast.info("cancelling subscription");
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("cancelation successful");
    navigate("/");
  }
  return (
    <HomeLayout>
      <div className='min-h-[90vh] flex items-center justify-center'>
        <div className='my-10 flex flex-col rounded-lg gap-4 p-4 text-white w-96 shadow-[0_0_10px_black]'>
            <img src={data?.avatar?.secure_url} alt="profile img" className='w-40 m-auto rounded-full border border-black' />
            <h3 className='text-xl font-semibold text-center capitalize'>{data?.fullName}</h3>
            <div className='grid grid-cols-2'>
                <p>Email:</p><p>{data?.email}</p>
                <p>Role:</p><p>{data?.role}</p>
                <p>Subscription:</p>
                <p>{data?.subscription?.status === "active" ? "Active" : "Inactive"}</p>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <Link to="/change-password" className='w-1/2 p-2 bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm font-semibold text-center '>Change Password</Link>
              <Link to="/edit-profile" className='w-1/2 p-2 bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-sm font-semibold text-center '>Edit Profile</Link>
            </div>
            {
              data?.subscription?.status === 'active' && (
                <button onClick={handleCancelation} className='w-full bg-red-600 hover:bg-red-500  transition-all ease-in-out duration-300 rounded-sm font-semibold text-center p-2'>
                  Cancel subscription
                </button>
              ) 
            }
        </div>
      </div>
    </HomeLayout>
  )
}

export default UserProfile
