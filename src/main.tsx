import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@/index.css'
import Nav from '@/Nav';
import Footer from '@/Footer';
import PrivacyPolicy from '@/PrivacyPolicy';
import Terms from '@/Terms';
import NotFound from '@/NotFound';

import App from '@/App'
// import App2 from './App2';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <div className="bg-slate-950 min-h-screen min-w-screen flex flex-col">
          <Nav />
          <main className="flex-grow">
            <Routes>
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/" element={<App />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </React.StrictMode>,
  );
}
