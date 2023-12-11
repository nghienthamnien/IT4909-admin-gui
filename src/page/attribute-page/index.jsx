import AttributeList from '../../components/attribute/attribute-list';
import { setTitle } from '../../util/setTitle';
import Heading from '../../components/page-heading';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function App() {
    setTitle('Attribute');
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        navigate('/attributes/new');
    };
    return (
        <div className="page-content">
            <Heading title={'Attribute'}>
                <Button type="primary" onClick={handleClick}>
                    New Attribute
                </Button>
            </Heading>
            <AttributeList />
        </div>
    );
}
