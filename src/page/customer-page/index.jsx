import CustomerList from '../../components/customer/customer-list';
import { setTitle } from '../../util/setTitle';
import Heading from '../../components/page-heading';

export default function App() {
    setTitle('Khách hàng');

    return (
        <div className="page-content">
            <Heading title={'Danh sách khách hàng'}></Heading>
            <CustomerList />
        </div>
    );
}
