import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';

import AddSite from '../components/AddSitePage';
import LandingPage from '../components/LandingPage';
import LoginFormPage from '../components/LoginFormPage';
import ProfilePage from '../components/ProfilePage';
import SignupFormPage from '../components/SignupFormPage';
import SiteDetailsPage from '../components/SiteDetailsPage';
import SiteListPage from '../components/SiteListPage'
import TagsPage from '../components/TagsPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/sites",
        element: <SiteListPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />
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
      },
      {
        path: "/tags",
        element: <TagsPage />
      }
    ],
  },
]);
