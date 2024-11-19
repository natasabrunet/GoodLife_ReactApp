import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// Lazy load components for better performance
const Login = lazy(() => import('pages/Login/Login'));
const Step0 = lazy(() => import('pages/Step0/Step0'));
const Step1 = lazy(() => import('pages/Step1/Step1'));
const Step2 = lazy(() => import('pages/Step2/Step2'));
const Step3 = lazy(() => import('pages/Step3/Step3'));
const Step4 = lazy(() => import('pages/Step4/Step4'));
const Step5 = lazy(() => import('pages/Step5/Step5'));
const Step6 = lazy(() => import('pages/Step6/Step6'));
const Step7 = lazy(() => import('pages/Step7/Step7'));
const Step8 = lazy(() => import('pages/Step8/Step8'));
const Settings = lazy(() => import('pages/Settings/Settings'));
const NotFound = lazy(() => import('pages/NotFound/NotFound'));

// Route configuration
const routes = [
  { path: '/', element: <Navigate to='/login' /> },
  { path: '/login', element: <Login /> },
  { path: '/step0', element: <Step0 /> },
  { path: '/step1', element: <Step1 /> },
  { path: '/step2', element: <Step2 /> },
  { path: '/step3', element: <Step3 /> },
  { path: '/step4', element: <Step4 /> },
  { path: '/step5', element: <Step5 /> },
  { path: '/step6', element: <Step6 /> },
  { path: '/step7', element: <Step7 /> },
  { path: '/step8', element: <Step8 /> },
  { path: '/settings', element: <Settings /> },
  { path: '*', element: <NotFound /> },
];

const Routing = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Routing;
