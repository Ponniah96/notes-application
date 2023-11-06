import { Home } from "./components/Home";
import { DisplayNotes } from "./components/DisplayNotes";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/display-notes',
    element: <DisplayNotes />
  }
];

export default AppRoutes;
