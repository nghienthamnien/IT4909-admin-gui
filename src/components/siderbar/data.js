import dashboardIcon from '../../assets/svg/dashboard.svg';
import orderIcon from '../../assets/svg/order.svg';
import customerIcon from '../../assets/svg/customer.svg';
import productIcon from '../../assets/svg/product.svg';
import promotionIcon from '../../assets/svg/promotion.svg';
import settingIcon from '../../assets/svg/setting.svg';
import employeeIcon from '../../assets/svg/employee.svg';

const data = [
    { icon: dashboardIcon, id: 1, title: 'Dashboard', link: '/' },
    {
        icon: orderIcon,
        id: 2,
        title: 'Quản lý đơn hàng',
        item: [
            { id: 1, name: 'Tất cả đơn hàng', link: 'orders' },
            { id: 2, name: 'Đơn hủy', link: 'orders/cancelled' },
            { id: 3, name: 'Trả Hàng / Hoàn tiền', link: 'orders/returnlists' },
        ],
    },
    {
        icon: productIcon,
        id: 3,
        title: 'Quản lý sản phẩm',
        item: [
            { id: 1, name: 'Tất cả sản phẩm', link: 'products' },
            { id: 2, name: 'Thêm sản phẩm', link: 'products/new' },
            { id: 3, name: 'Attributes', link: 'attributes' },
            { id: 4, name: 'Catalogs', link: 'catalogs' },
        ],
    },
    {
        icon: customerIcon,
        id: 4,
        title: 'Khách hàng',
        item: [{ id: 1, name: 'Danh sách khách hàng', link: 'customers' }],
    },
    {
        icon: promotionIcon,
        id: 5,
        title: 'Khuyến mãi',
        item: [
            { id: 1, name: 'Tất cả', link: 'coupons' },
            { id: 2, name: 'Thêm khuyến mãi', link: 'coupons/new' },
        ],
    },
    {
        icon: employeeIcon,
        id: 6,
        title: 'Quản lý nhân viên',
        item: [
            { id: 1, name: 'Danh sách nhân viên', link: 'employees' },
            { id: 2, name: 'Thêm nhân viên', link: 'employees/new' },
        ],
    },
    {
        icon: settingIcon,
        id: 7,
        title: 'Cài đặt',
        link: 'setting',
    },
];
export default data;
