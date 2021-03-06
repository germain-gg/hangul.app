import React from "react";

import { AppContext, useClientRouting } from "./utils/utils";

import { Router, Route } from "./components/Router";

import LettersPage from "./pages/Letters";
import SyllablesPage from "./pages/Syllables";

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
          <main>
          <ul style={{
            height: "100%",
            display: "flex",
            "flexDirection": "column",
            "justifyContent": "center",
            "alignItems": "center",
            gap: "30px"
          }}>
            <li>
              <a href="/letters" className="glossy-button" style={{ background: "#5639E0" }}>
                Letters
              </a>
            </li>
            <li>
              <a href="/syllables" className="glossy-button" style={{ background: "#FF6C27" }}>
                Syllables
              </a>
            </li>
          </ul>
          </main>
        </Route>
        <Route path="/letters">
          <LettersPage />
        </Route>
        <Route path="/syllables">
          <SyllablesPage />
        </Route>
      </Router>
    </AppContext.Provider>
  );
}
