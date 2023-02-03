import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DetailsPage } from '../../../feature/pages/details/details.page';
import { MenuItemsType } from '../types/menu.items';

const Home = lazy(() => import('../../../feature/pages/home/home.page'));
const Adopt = lazy(() => import('../../../feature/pages/adopt/adopt.page'));
const Favourites = lazy(
    () => import('../../../feature/pages/favourites/favourites.page')
);

export function AppLazyRoutes({ items }: { items: MenuItemsType }) {
    return (
        <Suspense>
            <Routes>
                <Route path={''} element={<Home></Home>}></Route>
                <Route path={items[0].path} element={<Home></Home>}></Route>
                <Route path={items[1].path} element={<Adopt></Adopt>}></Route>
                <Route
                    path={items[2].path}
                    element={<Favourites></Favourites>}
                ></Route>
                <Route
                    path=":page/:petId"
                    element={<DetailsPage></DetailsPage>}
                ></Route>
                <Route
                    path={'*'}
                    element={<Navigate to="" replace></Navigate>}
                ></Route>
            </Routes>
        </Suspense>
    );
}
