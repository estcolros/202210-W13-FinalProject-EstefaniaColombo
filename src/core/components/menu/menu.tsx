import { Link } from 'react-router-dom';
import { MenuItemsType } from '../types/menu.items';
import './menu.scss';

export function Menu({ items }: { items: MenuItemsType }) {
    return (
        <nav className="menu">
            <ul>
                {items.map((item) => (
                    <li key={item.label}>
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
