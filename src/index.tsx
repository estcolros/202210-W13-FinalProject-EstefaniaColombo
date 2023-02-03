import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './core/components/app/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { PetContextProvider } from './core/context/pets.provider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <PetContextProvider>
            <BrowserRouter>
                <App></App>
            </BrowserRouter>
        </PetContextProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
