import { Provider } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import appStore from '@store';
import MovieDetails from './pages/MovieDetails';
import './UI/app.css';

// Auto generates routes from files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.globEager('./pages/*.jsx');

const routes = Object.keys(pages)
  .map((path) => {
    const name = path.match(/\.\/pages\/(.*)\.jsx$/)[1];
    if (name === 'MovieDetails') {
      return null;
    }
    return {
      name,
      path: name === 'Home' ? '/' : `/${name.toLowerCase()}`,
      component: pages[path].default,
    };
  })
  .filter(Boolean);

export function App({ store = appStore }) {
  return (
    <Provider store={store}>
      <nav>
        <ul>
          {routes.map(({ name, path }) => {
            return (
              <li key={path}>
                <Link to={path}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Routes>
        {routes.map(({ path, component: RouteComp }) => {
          return <Route key={path} path={path} element={<RouteComp />} />;
        })}
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </Provider>
  );
}
