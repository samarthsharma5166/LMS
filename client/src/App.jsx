import './App.css'
import {Routes,Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import CourseList from './Pages/courses/CourseList'
import Contact from './Pages/Contact'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/courses/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/courses/CreateCourse'
import UserProfile from './Pages/UserProfile'
import EditProfile from './Pages/EditProfile'
import Checkout from './Pages/Payment/Checkout'
import CheckOutSuccess from './Pages/Payment/CheckOutSuccess'
import CheckoutFaileure from './Pages/Payment/CheckoutFaileure'
import DisplayLectures from './Pages/Dashboard/DisplayLectures'
import AddLecuture from './Pages/Dashboard/AddLecuture'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'
function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/courses' element={<CourseList/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/denied' element={<Denied/>}/>
      <Route path='/course/description' element={<CourseDescription/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
          <Route path='/course/create' element={<CreateCourse/>}/>
          <Route path='/course/addlectures' element={<AddLecuture/>}/>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      </Route>
      <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
          <Route path='/user/profile' element={<UserProfile/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/checkout/success' element={<CheckOutSuccess/>}/>
          <Route path='/checkout/fail' element={<CheckoutFaileure/>}/>
          <Route path='/course/displaylectures' element={<DisplayLectures/>}/>
      </Route>
      <Route path='*' element={<NotFound/>}></Route>
    </Routes>
  )
}

export default App
