import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage";
import Livestream from "../pages/Livestream";

const router = createBrowserRouter([{  path:"/", element:<App/>,
     children :[{ path :"",  element :<Home/>} ,
        { path :":explore",  element :<ExplorePage/>},
        { path :":explore/:id",  element :<DetailsPage/>},
        { path :"search",  element :<SearchPage/>},
        { path: "Livestream", element: <Livestream /> }


    ]

}]);

export default router;