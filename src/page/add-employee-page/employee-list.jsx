import EmployeeList from '../../components/employee/employee-list';
import { setTitle } from '../../util/setTitle';
import Heading from '../../components/page-heading';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function App() {
    setTitle('Employee');
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        navigate('/employees/new');
    };
    return (
        <div className="page-content">
            <Heading title={'Employee'}>
                <Button type="primary" onClick={handleClick}>
                    New Employee
                </Button>
            </Heading>
            <EmployeeList />
        </div>
    );
}
