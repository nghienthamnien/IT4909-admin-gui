import NewProduct from '../../components/product/new-product';
import { setTitle } from '../../util/setTitle';
import Heading from '../../components/page-heading';

export default function App() {
    setTitle('Create a new Product');
    return (
        <div className="page-content">
            <Heading title={'Create a new Product'} isBack={true}></Heading>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    paddingTop: '32px',
                }}
            >
                <NewProduct />
            </div>
        </div>
    );
}
