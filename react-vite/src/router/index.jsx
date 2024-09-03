import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage';
import SiteDetailsPage from '../components/SiteDetailsPage';
import AddSite from '../components/AddSitePage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/sites/:siteId",
        element: <SiteDetailsPage />
      },
      {
        path: "/sites/add",
        element: <AddSite toggle={'create'}/>
      },
      {
        path: "/sites/:siteId/edit",
        element: <AddSite toggle={'update'}/>
      }
    ],
  },
]);
