import MainLayout from "./layout/AdminLayout";
import { Routes, Route, BrowserRouter as Router, } from 'react-router-dom';
import AdminLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";



function App() {
  return (
    <div className="App">
      
        <Router>
          <Routes>
          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/number/:id" element={<DetailPage />} />


                <Route path="*" element={<div>Sayfa Bulunamadı</div>} />
                </Routes>
              </MainLayout>
            }
          />

          <Route
            path="/admin/*"
            element={
              <AdminLayout>
                <Routes>


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
