import React from 'react';
import { useRouteError } from 'react-router-dom';
import { setTitle } from '../../util/setTitle';
import './index.css';

export default function ErrorPage() {
    setTitle('404: This page could not be found');
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>404 | This page could not be found.</i>
            </p>
        </div>
    );
}
