import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import {Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { store } from './store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Theme preset={presetGpnDefault}>
                <App />
            </Theme>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
