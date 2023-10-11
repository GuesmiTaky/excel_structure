import { createBrowserRouter } from "react-router-dom";
import Login from "../views/login/Login";
import Dashboard from "./../views/Dashboard";
import ListProject from "./../views/backOffice/project/ListProject";
import ListCategory from "./../views/backOffice/category/ListCategory";
import NotFound from "../views/NotFoundPage";
import AddProject from "./../views/backOffice/project/AddProject";
import EditProject from "./../views/backOffice/project/EditProject";
import AddCategory from "./../views/backOffice/category/AddCategory";
import EditCategory from "./../views/backOffice/category/EditCategory";
import DetailCategory from "../views/backOffice/category/DetailCategory";
import DetailProject from "../views/backOffice/project/DetailProject";
import DashbordMain from "../views/excelStructure/DashbordMain";
import MainPage from "../views/excelStructure/MainPage";
import ListNews from "../views/backOffice/news/ListNews";
import AddNews from "../views/backOffice/news/AddNews";
import EditNews from "../views/backOffice/news/EditNews";
import DetailNews from "../views/backOffice/news/DetailNews";
import ListCategoryMain from "../views/excelStructure/category/ListCategoryMain";
import ProjectFront from "../views/excelStructure/Project/ProjectFront";
import ContactPage from "../views/excelStructure/contact/ContactPage";
import ListPartner from "./../views/backOffice/partner/ListPartner";
import AddPartner from "./../views/backOffice/partner/AddPartner";
import EditPartner from "./../views/backOffice/partner/EditPartner";
import DetailPartner from "./../views/backOffice/partner/DetailPartner";
import MapLeaflet from "../views/excelStructure/footer/MapLeaflet/MapLeaflet";
import ReactGoogleMaps from "../views/excelStructure/footer/MapGoogle/ReactGoogleMaps";

const router = createBrowserRouter([
  {
    path: "/admin/dashbord",
    element: <Dashboard />,
    children: [
      //route project
      {
        path: "list-project",
        element: <ListProject />,
      },
      {
        path: "add-project",
        element: <AddProject />,
      },
      {
        path: "edit-project/:id",
        element: <EditProject />,
      },
      {
        path: "detail-project/:id",
        element: <DetailProject />,
      },
      //route category
      {
        path: "list-category",
        element: <ListCategory />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "edit-category/:id",
        element: <EditCategory />,
      },
      {
        path: "detail-category/:id",
        element: <DetailCategory />,
      },

      //route news
      {
        path: "list-news",
        element: <ListNews />,
      },
      {
        path: "add-news",
        element: <AddNews />,
      },
      {
        path: "edit-news/:id",
        element: <EditNews />,
      },
      {
        path: "detail-news/:id",
        element: <DetailNews />,
      },

      //route partner
      {
        path: "list-partner",
        element: <ListPartner />,
      },
      {
        path: "add-partner",
        element: <AddPartner />,
      },
      {
        path: "edit-partner/:id",
        element: <EditPartner />,
      },
      {
        path: "detail-partner/:id",
        element: <DetailPartner />,
      },
    ],
  },

  {
    path: "/admin/login",
    element: <Login />,
  },

  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/",
    element: <DashbordMain />,
    children: [
      //route dashbord
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/contact-page",
        element: <ContactPage />,
      },

      {
        path: "/list-category-main",
        element: <ListCategoryMain />,
      },

      {
        path: "/project-front/:id",
        element: <ProjectFront />,
      },
      {
        path: "/leaflet-map",
        element: <MapLeaflet />,
      },
      {
        path: "/google-map",
        element: <ReactGoogleMaps />,
      },
    ],
  },
]);

export default router;
