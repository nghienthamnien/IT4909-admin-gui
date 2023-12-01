import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import ProtectedRoute from './page/root-page';
import DashBoard from './page/dashboard-page';
import ErrorPage from './page/error-page';
import LoginPage from './page/login-page';
import SignupPage from './page/add-employee-page';
import store from './app/store';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <DashBoard />,
            },
            {
                path: 'orders',
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: 'cancelled',
                    },
                    { path: 'returnlists' },
                ],
            },
            {
                path: 'products',
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: 'new',
                    },
                ],
            },
            {
                path: 'customers',
            },
            {
                path: 'coupons',
                children: [{ path: 'new' }],
            },
            {
                path: 'employees',
                children: [{ path: 'new', element: <SignupPage /> }],
            },
            { path: 'setting' },
        ],
    },
    {
        path: 'auth/login',
        element: <LoginPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);
