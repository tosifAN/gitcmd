import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'; 
import SignUp from './components/SignUp';
import Dashboard from './components/User/Dashboard';
import Support from './components/Support';
import Pricing from './components/Pricing';
import StudentHome from './components/Test/EnterTestPaper';
import Result from './components/User/Result';
import Options from './components/Test/Options'
import CreateManually from './components/Test/CreateManually'
import CreatePDF from './components/Test/CreatePDF'
import Update from "./components/User/Update"
import Details from './components/Test/Details';
import Preview from './components/Test/Preview';
import PageNotFound from "./parts/PageNotFound";
import MainTest from "./components/Test/MainTest"
import Courses from './components/Courses';
import Blogs from './components/Blogs';
import SubmitUserBlog from './components/Blogs/SubmitUserBlog';
import UserBlogs from './components/User/UserBlogs';
import ShowUserSubmitedBlogs from "./components/Blogs/ShowUserSubmitedBlogs"
import Blogger from "./components/Blogs/Blog"
import UploadPdf from './components/Test/UploadPdf';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/user" element={<Dashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/support" element={<Support />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blogger />}/>
          <Route path="/generate/user" element={<Options />} />
          <Route path="/entertestpaper" element={<StudentHome />} />
          <Route path="/entertestpaper/testpaper" element={<MainTest />} />
          <Route path="/result/user" element={<Result />} />
          <Route path="/user/blogs" element={<UserBlogs />} />
          <Route path="/user/submitblogs" element={<SubmitUserBlog />} />
          <Route path="/user/personalsubmittedblogs" element={<ShowUserSubmitedBlogs />} />
          <Route path="/createmanuallymcqs/user" element={<CreateManually />} />
          <Route path="/createthroughpdfmcqs/user" element={<CreatePDF/>} />
          <Route path="/createthroughpdfmcqs/user/uploadpdf" element={< UploadPdf/>} />
          <Route path="/createmanuallymcqs/user/title" element={<Details/>} />
          <Route path="/createmanuallymcqs/user/preview" element={<Preview/>} />
          <Route path="/update-profile/user" element={<Update/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
//<Route path="/blog/:id" element={<Blogger />} />remove