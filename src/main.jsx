import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import DashboardRoute from "./DashboardRouts/DashboardRoute";
import UserInfo from "./User/UserInfo";
import CashOut from "./User/CashOut";
import CashInRequest from "./User/CashInRequest";
import CashInApproval from "./Agent/CashInApproval";
import Transactions from "./User/Transactions ";
import LogoutHandler from "./Pages/LogoutHandler";
import AgentHistory from "./Agent/AgentHistory";
import UserList from "./Admin/UserList";
import AllTransactions from "./Admin/AllTransactions";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path : '/dashboard',
    element : <DashboardRoute></DashboardRoute>,
    children : [
      {
        path : "",
        element : <Dashboard></Dashboard>
      },
      {
        path : 'user-info',
        element : <UserInfo></UserInfo>
      },
      {
        path : 'cash-out',
        element : <CashOut></CashOut>
      },
      {
        path : 'cash-in-request',
        element : <CashInRequest/>
      },
      {
        path: 'cash-in-approve',
        element : <CashInApproval/>
      },
      {
        path : 'transaction',
        element : <Transactions/>
      },
      {
        path : 'LogoutHandler',
        element : <LogoutHandler/>
      },
      {
        path : 'agent-history',
        element : <AgentHistory/>
      },
      {
        path : 'users',
        element : <UserList></UserList>
      },
      {
        path : 'all-transaction',
        element : <AllTransactions/>
      }
    ]
  }
  // {
  //   path: "/dashboard",
  //   element: <Dashboard></Dashboard>,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
