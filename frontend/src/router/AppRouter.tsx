import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { HOME_ROUTE, LOGIN_ROUTE, NOT_FOUND, REGISTER_ROUTE, SEARCH_ROUTE, SEARCH_TERM_PARAM_NAME } from "./routes";
import NotFoundPage from "../pages/NotFoundPage";
import SearchResults from "../pages/SearchResults";

const AppRouter = () => {
  return(
    <Routes>
      <Route element={<Header />}>
        <Route path={HOME_ROUTE} element={<HomePage />}/>
        <Route path={REGISTER_ROUTE} element={<RegisterPage />}/>
        <Route path={LOGIN_ROUTE} element={<LoginPage />}/>
        <Route path={`${SEARCH_ROUTE}/:${SEARCH_TERM_PARAM_NAME}`} element={<SearchResults/>}/>
        <Route path={NOT_FOUND} element={<NotFoundPage />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Route>
    </Routes>
  );
}

export default AppRouter;