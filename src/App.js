import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import { OrderNumberPage } from './Pages/OrderNumberPage';

function App(props) {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/order-number" />} />
            <Route path="/order-number" element={<OrderNumberPage {...props} />} />
            <Route path="/login" element={<LoginPage {...props} />} />
            <Route path="/otp" element={<OtpPage {...props} />} />
            <Route path="/product-list" element={<PrivateRoute element={RefundPage} {...props} />} />
            <Route path="/product-list/details" element={<PrivateRoute element={RefundDetailsPage} {...props} />} />
            <Route path="/bank-info" element={<PrivateRoute element={BankInfoPage} {...props} />} />
            <Route path="/bank-info/confirmation" element={<PrivateRoute element={BankInfoConfirmationPage} {...props} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
