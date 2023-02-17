import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';
import { items } from '../routes/mocks';

export function Layout({ children }: { children: JSX.Element }) {
    return (
        <>
            <Header>
                <Menu items={items}></Menu>
            </Header>
            {children}
            <Footer></Footer>
        </>
    );
}
