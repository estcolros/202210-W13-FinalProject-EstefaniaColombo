import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import FavouritesPage from './favourites.page';

describe('When render DetailsPage Page', () => {
    test('It should render the title', () => {
        render(
            <BrowserRouter>
                <FavouritesPage></FavouritesPage>
            </BrowserRouter>
        );
        const headingElement = screen.getByRole('heading', {
            name: /My favourites pets/i,
        });
        expect(headingElement).toBeInTheDocument();
    });
});
