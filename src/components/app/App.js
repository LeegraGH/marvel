import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import SingleChar from "../singleChar/SingleChar";
import SingleComic from "../singleComic/SingleComic";
import {MainPage} from "../pages";

const ComicsPage = lazy(()=>import("../pages/ComicsPage"));
const Page404 = lazy(()=>import("../pages/Page404"));
const SinglePage = lazy(()=>import("../pages/SinglePage"));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics/" element={<ComicsPage/>}/>
                            <Route path="/comics/:id" element={<SinglePage Component={SingleComic} dataType={"comic"}/>}/>
                            <Route path="/characters/:id" element={<SinglePage Component={SingleChar} dataType={"character"}/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App;