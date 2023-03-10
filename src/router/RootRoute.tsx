import { DashboardLayout } from '../layout/DashboardLayout';
import { AuthGuard } from '../guard/AuthGuard';
import { Navigate } from 'react-router-dom';
import { Home } from '../page/home';
import { List } from "../page/list";


export const RootRoute = [
  { path: 'list',
    element: (
      <List>
      </List>
    )
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: 'home',
        element: (
          <AuthGuard>
            <Home />
          </AuthGuard>
        ),
      },
      { path: '', element: <Navigate to="home" /> },
    ],
  },
  // 重定向
  { path: '', element: <Navigate to="/dashboard" /> },
  { path: '*', element: <Navigate to="/dashboard" /> },
];
