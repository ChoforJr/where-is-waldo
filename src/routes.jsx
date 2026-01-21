import App from "./App Components/App";
import HomePage from "./HomePage Components/HomePage";
import Rankings from "./Rankings Components/Rankings";
import Gameplay from "./Gameplay Components/Gameplay";
import Help from "./Help Components/Help";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    // This is a catch-all for errors that occur within the <App /> component or its children.
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "ranking/:level?", element: <Rankings /> },
      { path: "gameplay/:boardID/:gameID", element: <Gameplay /> },
      { path: "help", element: <Help /> },
    ],
  },
];

export default routes;
