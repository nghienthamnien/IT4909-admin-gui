import './index.css';
import SignupForm from '../../components/signup-form';
import { setTitle } from '../../util/setTitle';

const SignupPage = () => {
    setTitle('Thêm nhân viên');
    return (
        <div className="signup">
            <div className="form-title">
                <h2 style={{ marginRight: '16px' }}>Thêm nhân viên</h2>
            </div>
            <div className="signup-form">
                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;
