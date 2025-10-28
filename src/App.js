import { Fragment } from "react";
import { DefaultLayout } from "./layouts";

//routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {publicRoutes} from './routes/index.js'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            }
            else if (route.layout === null) {
              Layout = Fragment
            }
            const Page = route.component
            return <Route
              key={index}
              path={route.path}
              element= {<Layout><Page/></Layout>}
            />
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
