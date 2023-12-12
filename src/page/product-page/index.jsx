import ProductList from '../../components/product/product-list';
import { setTitle } from '../../util/setTitle';
import Heading from '../../components/page-heading';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function App() {
    setTitle('Product');
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault();
        navigate('/products/new');
    };
    return (
        <div className="page-content">
            <Heading title={'Product'}>
                <Button type="primary" onClick={handleClick}>
                    New Product
                </Button>
            </Heading>
            <ProductList />
        </div>
    );
}
