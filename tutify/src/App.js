
import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Main from "./components/Main";
import SignUp from "./components/SignUp"
import Database from "./components/Database"
import SearchResults from "./components/SearchResults/SearchResults"
import SearchPage from "./components/SearchPage"

// This is all the url routing.
function MainPage() {
  return (
    <Router>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/database" component={Database} />
        <Route exact path="/searchPage" component={SearchPage} />
        <Route exact path="/searchResults" component={SearchResults} />
    </Router>
  );

}

// This is the component that will be shown by default
export default MainPage;
