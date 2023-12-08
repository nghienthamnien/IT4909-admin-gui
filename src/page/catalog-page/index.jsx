import CatalogList from '../../components/catalog/catalog-list';
import { setTitle } from '../../util/setTitle';
import Heading from '../../components/page-heading';
import './index.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function App() {
    setTitle('Catalog');
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        navigate('/catalogs/new');
    };
    return (
        <div className="page-content">
            <Heading title={'Catalog'}>
                <Button type="primary" onClick={handleClick}>
                    Add Catalog
                </Button>
            </Heading>
            <CatalogList />
        </div>
    );
}
