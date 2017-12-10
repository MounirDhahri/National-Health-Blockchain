import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => (
  <div className="header pull-right">
    <ul className="list-inline list-group">
      <li className="list-inline-item list-group-item"><Link to="/">Home</Link></li>
      <li className="list-inline-item list-group-item"><Link to="/generate">Create Transaction</Link></li>
      <li className="list-inline-item list-group-item"><Link to="/sample">Create Transaction</Link></li>
      <li className="list-inline-item list-group-item"><Link to="/login">Sign out</Link></li>
    </ul>
  </div>
);

export default Navigation;
