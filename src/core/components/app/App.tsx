import { Layout } from '../layout/layout';
import { AppLazyRoutes } from '../routes/app.lazy.routes';
import { MenuItemsType } from '../types/menu.items';
import './App.css';

function App() {
    const items: MenuItemsType = [
        { path: '/home', label: 'Home' },
        { path: '/adopt', label: 'Adopt' },
        { path: '/favorites', label: 'Favorites' },
        { path: '/publish', label: 'Publish' },
    ];

    return (
        <>
            <Layout>
                <AppLazyRoutes items={items}></AppLazyRoutes>
            </Layout>
        </>
    );
}

export default App;
