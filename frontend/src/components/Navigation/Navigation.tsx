import { NavLink } from 'react-router-dom';
import './Navigation.css';

export function Navigation() {
    return (
        <nav className="Navigation">
            <div className="Navigation__brand">
                <NavLink to="/">CarPark Application</NavLink>
            </div>
            <ul className="Navigation__links">
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? "Navigation__link--active" : ""}>
                        Explore Cars
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/basket" className={({ isActive }) => isActive ? "Navigation__link--active" : ""}>
                        Basket
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin" className={({ isActive }) => isActive ? "Navigation__link--active" : ""}>
                        Admin
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}