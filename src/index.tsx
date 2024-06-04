import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';

const webappRootId = 'webapp-root';
const webappRootElement = document.getElementById(webappRootId);

if (webappRootElement) {
    ReactDOM.createRoot(webappRootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
} else {
    // eslint-disable-next-line no-console
    console.error(`Could not find html element with id '${webappRootId}'`);
}
