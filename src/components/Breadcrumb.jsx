import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className={`breadcrumb-item${location.pathname === '/' ? ' active' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'text-muted' : ''}>
            Dashboard
          </Link>
          {pathnames.length > 0 && <span className="breadcrumb-separator">/</span>}
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={to}>
              <li className={`breadcrumb-item${index === pathnames.length - 1 ? ' active' : ''}`}>
                <Link to={to} className={index === pathnames.length - 1 ? 'text-muted' : ''}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              </li>
              {index !== pathnames.length - 1 && <span className="breadcrumb-separator"> / </span>}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
