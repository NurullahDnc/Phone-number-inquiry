 import { Routes, Route, BrowserRouter as Router, } from 'react-router-dom';
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import CommentFeedbackPage from "./pages/CommentFeedback";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CountryCodePage from "./pages/CountryCodePage";
import FaqPage from "./pages/FaqPage";
 import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AdminLayout from './layout/AdminLayout';
import DashboardPage from "./pages/DashboardAdminPage";
import NumberPage from './pages/NumberAdminPage';
import CommentPage from './pages/CommentAdminPage';
import PrivacyPolicyAdminPage from './pages/PrivacyPolicyAdminPage';
import FeedbackAdminPage from './pages/FeedbackAdminPage';
import BlogAdminPage from './pages/BlogAdminPage';
import FaqAdminPage from './pages/FaqAdminPage';
import InformationAdminPage from './pages/InformationAdminPage';
import LogoAdminPage from './pages/LogoAdminPage';
import LoginAdminPage from './pages/LoginAdminPage';




function App() {
  return (
    <div className="App">

<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
 />
 <ToastContainer />

        <Router>
          <Routes>
          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/number/:id" element={<DetailPage />} />
                <Route path="/deleteForm/:id" element={<CommentFeedbackPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/detail/:id" element={<BlogDetailPage />} />
                <Route path="/countrycode" element={<CountryCodePage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
                <Route path="/adminlogin" element={<LoginAdminPage />} />



                </Routes>
              </MainLayout>
            }
          />
 
    <Route path="/adminlogin" element={<LoginAdminPage />} />
 

          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>

                <Route path="/" element={<DashboardPage />} />
                <Route path="/number" element={<NumberPage />} />
                <Route path="/comment" element={<CommentPage />} />
                <Route path="/feedback" element={<FeedbackAdminPage />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicyAdminPage />} />
                <Route path="/blog" element={<BlogAdminPage />} />
                <Route path="/faq" element={<FaqAdminPage />} />
                <Route path="/information" element={<InformationAdminPage />} />
                <Route path="/logo" element={<LogoAdminPage />} />



                  <Route path="*" element={<div >Sayfa Bulunamadı</div>} />
                </Routes>
              </AdminLayout>
            }
          />

          </Routes>
        </Router>
    </div>
  );
}

export default App;
