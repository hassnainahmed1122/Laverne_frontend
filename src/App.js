import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Layout } from './Components/Layout/Layout';
import { LoginPage } from './Pages/LoginPage';
import { OtpPage } from './Pages/OtpPage';
import { RefundPage } from './Pages/RefundPage';
import { BankInfoPage } from './Pages/BankInfoPage';
import { RefundDetailsPage } from './Pages/RefundDetailsPage';
import { BankInfoConfirmationPage } from './Pages/BankInfoConfirmationPage';
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App(props) {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? "/product-list" : "/login"} />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/product-list" /> : <LoginPage {...props} />} />
            <Route path="/otp" element={isAuthenticated ? <Navigate to="/product-list" /> : <OtpPage {...props} />} />
            <Route path="/product-list" element={<PrivateRoute element={RefundPage} />} />
            <Route path="/product-list/details" element={<PrivateRoute element={RefundDetailsPage} />} />
            <Route path="/bank-info" element={<PrivateRoute element={BankInfoPage} />} />
            <Route path="/bank-info/confirmation" element={<PrivateRoute element={BankInfoConfirmationPage} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
