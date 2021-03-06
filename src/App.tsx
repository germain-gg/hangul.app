import React from "react";

import { AppContext, useClientRouting } from "./utils/utils";

import LettersPage from "./pages/Letters";
import { Router, Route } from "./components/Router";

export default function App(): JSX.Element {

  const { activePath } = useClientRouting();

  return (
    <AppContext.Provider value={{ activePath }}>
      <header>
        <h1 lang="ko">
          <span role="img" aria-label="Korean flags">
            🇰🇷
          </span>
          한글 배우기
        </h1>

        { activePath !== "/" && (
          <a href="/">
            <span role="img" aria-label="Go back to the homepage">
              🏠
            </span>
          </a>
        )}

      </header>
      <Router>
        <Route path="/">
          <LettersPage />
        </Route>
      </Router>
    </AppContext.Provider>
  );
}
