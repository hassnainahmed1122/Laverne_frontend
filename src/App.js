import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './Components/Header/Header';
import { Layout } from './Components/Layout/Layout';
import { HomePage } from './Pages/HomePage';
import { LoginPage } from './Pages/LoginPage';
import { OtpPage } from './Pages/OtpPage';
import { RefundPage } from './Pages/RefundPage';
import { BankInfoPage } from './Pages/BankInfoPage';

function App(props) {
  return (
    <Router>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage {...props} />} />
          <Route path="/login" element={<LoginPage {...props} />} />
          <Route path="/otp" element={<OtpPage {...props} />} />
          <Route path="/refund-request" element={<RefundPage {...props} />} />
          <Route path="/bank-info" element={<BankInfoPage {...props} />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
