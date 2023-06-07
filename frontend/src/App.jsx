import { RouterProvider } from "react-router";
import "./app.css";
import router from "./routes";

function App() {
  return (
    <div className='app'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
