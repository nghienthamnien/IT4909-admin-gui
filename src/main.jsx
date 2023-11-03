import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Root from './page/root-page';
import ErrotPage from './page/error-page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrotPage />,
        children: [
            {
                path: 'products/new',
                errorElement: <ErrotPage />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
