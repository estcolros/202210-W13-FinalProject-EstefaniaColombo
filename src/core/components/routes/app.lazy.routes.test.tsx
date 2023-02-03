/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppLazyRoutes } from './app.lazy.routes';
import { mockPageTitles, items } from './mocks';
const testLazyRoute = (index: number) => {
    const title = new RegExp(mockPageTitles[index], 'i');
    const lazyElement = screen.getByText(title);
    expect(lazyElement).toBeInTheDocument();
};
jest.mock('../../../feature/pages/home/home.page', () => {
    return () => <p>{mockPageTitles[0]}</p>;
});

jest.mock('../../../feature/pages/favourites/favourites.page', () => {
    return () => <p>{mockPageTitles[1]}</p>;
});

jest.mock('../../../feature/pages/adopt/adopt.page', () => {
    return () => <p>{mockPageTitles[2]}</p>;
});

describe('Given AppRoutes Lazy component, if the user is logged', () => {
    let lazyPaths: Array<string>;

    beforeEach(() => {
        lazyPaths = items.map((item) => item.path);
    });
    describe(`When we render the component 
                And the lazy route is Home`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={0}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the HomePage', () => {
            testLazyRoute(0);
        });
    });

    describe(`When we render the component 
                And the lazy route is Adopt`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={0}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the AdoptPage', () => {
            testLazyRoute(0);
        });
    });

    describe(`When we render the component 
                And the lazy route is Favourites`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={0}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the FavouritesPage', () => {
            testLazyRoute(0);
        });
    });
});
