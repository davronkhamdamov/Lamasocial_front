import React from "react";
import Route from "./router/router";
import Loading from "./components/Loading/Loading";

function App() {
  return (
    <div>
      <React.Suspense fallback={<Loading />}>
        <Route />
      </React.Suspense>
    </div>
  );
}
export default App;
