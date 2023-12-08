import './index.css';
import SignupForm from '../../components/signup-form';
import { setTitle } from '../../util/setTitle';

const SignupPage = () => {
    setTitle('Thêm nhân viên');
    return (
        <div
            style={{
                display: 'flex',
                paddingTop: '32px',
                paddingBottom: '64px',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            <div className="signup">
                <div className="signup-form-title">
                    <h2>Thêm nhân viên</h2>
                </div>
                <div className="signup-form">
                    <SignupForm />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
