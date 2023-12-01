import './index.css';
import LoginForm from '../../components/login-form';
import Header from '../../components/header';
import { setTitle } from '../../util/setTitle';
import Footer from '../../components/footer';

const LoginPage = () => {
    setTitle('Login');
    return (
        <>
            <Header />
            <div className="wrapper">
                <div className="login">
                    <div className="form-title">
                        <h2>Welcome back!</h2>
                    </div>
                    <div className="login-form">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginPage;
