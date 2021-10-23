import { useState } from "react";
import ccn from "./utils/chainable-class-names";
import css from "./App.module.css";

const $ = ccn(css);

export function App() {
  const [isCentered, setIsCentered] = useState(true);
  const [isDanger, setIsDanger] = useState(false);

  const toggleIsCentered = () => setIsCentered((state) => !state);
  const toggleIsDanger = () => setIsDanger((state) => !state);

  return (
    <div className={$.App()}>
      <header className={$.AppHeader()}>Chainable Class Names Demo</header>
      <div className={$.AppContent()}>
        <main className={$.AppMain()}>
          {/* Demo for conditional classes */}
          <div>
            <button onClick={toggleIsCentered}>Toggle "center"</button>{" "}
            <button onClick={toggleIsDanger}>Toggle "danger"</button>
          </div>

          <h1 className={$.AppTitle.center(isCentered).danger(isDanger)()}>Chainable Class Names</h1>
          <p className={$.AppText.center(isCentered).danger(isDanger).$}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
            labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
            amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
            justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet.
          </p>
          <p className={$.danger()}>This text is always danger but never centered.</p>
        </main>
      </div>
    </div>
  );
}

