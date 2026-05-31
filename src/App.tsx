import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import ApprovePage from "@/pages/ApprovePage";
import DashboardPage from "@/pages/DashboardPage";
import WorkflowPage from "@/pages/WorkflowPage";
import SessionPage from "@/pages/SessionPage";
import SettingsPage from "@/pages/SettingsPage";
import ProfilePage from "@/pages/ProfilePage";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/approve/:token", element: <ApprovePage /> },
  {
    path: "/",
    element: <AppShell />,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
      { path: "workflows/:workflowId", element: <WorkflowPage /> },
      { path: "workflows/:workflowId/sessions/:sessionId", element: <SessionPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
