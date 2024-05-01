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
import PasswordResetAdminaPage from './pages/PasswordResetAdminaPage';
import CountryAdminPage from './pages/CountryAdminPage';
import MetaTags from './comporents/general/MetaTags';





function App() {

  const seoData =[
    {
      title: "Logo",
      description: "Blog sayfası açıklaması buraya gelecek.",
      keywords: "icerikler"
    }
  ]

  return (
    <div className="App my-text">

{
      seoData.map((item, i)=>(
        <MetaTags
        title={item.title}
        description={item.description}
        keywords={item.keywords}

      />
      ))
    }


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
                <Route path="/telefon-numarasi/:id" element={<DetailPage />} />
                <Route path="/form-sil/:id" element={<CommentFeedbackPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog-detail/:id/:title" element={<BlogDetailPage />} />
                <Route path="/ulke-alan-kodlari" element={<CountryCodePage />} />
                <Route path="/sikca-sorulan-sorular" element={<FaqPage />} />
                <Route path="/kisisel-verilerin-korunmasi" element={<PrivacyPolicyPage />} />
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
                <Route path="/password" element={<PasswordResetAdminaPage />} />
                <Route path="/country" element={<CountryAdminPage />} />





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
