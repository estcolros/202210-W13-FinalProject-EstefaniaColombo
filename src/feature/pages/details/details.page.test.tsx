import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { DetailsPage } from './details.page';

describe('When render DetailsPage Page', () => {
    test('It should render the title', () => {
        render(
            <BrowserRouter>
                <DetailsPage></DetailsPage>
            </BrowserRouter>
        );
        const headingElement = screen.getByRole('heading', {
            name: /Pet details/i,
        });
        expect(headingElement).toBeInTheDocument();
    });
});
