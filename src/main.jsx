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
import CatalogPage from './page/catalog-page';
import AttributePage from './page/attribute-page';
import NewAttributePage from './page/attribute-page/new-attribute-page';
import NewCatalogPage from './page/catalog-page/new-catalog';

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
                path: 'attributes',
                children: [
                    { path: 'new', element: <NewAttributePage /> },
                    { index: true, element: <AttributePage /> },
                    { path: 'edit/:code' },
                ],
            },
            {
                path: 'catalogs',
                children: [
                    { path: 'new', element: <NewCatalogPage /> },
                    { index: true, element: <CatalogPage /> },
                    { path: 'edit/:id' },
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
