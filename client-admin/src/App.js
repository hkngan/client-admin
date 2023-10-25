import React from 'react'
import { Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import routes from './routes'
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';

function App() {
  return (
      <div>
          <Router>
              <Routes>
                  {routes.map((route, index) => {
                      const Page = route.page;
                      const Layout = route.layout === null ? Fragment : DefaultLayout;
                      return (
                          <Route
                              key={index}
                              path={route.path}
                              element={
                                  <Layout>
                                      <Page />
                                  </Layout>
                              }
                          />
                      );
                  })}
              </Routes>
          </Router>
      </div>
      
  );
}



export default App;
