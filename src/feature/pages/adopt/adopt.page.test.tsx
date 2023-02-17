import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import AdoptPage from './adopt.page';

describe('When render AdoptPage Page', () => {
    test('It should render the title', () => {
        render(
            <BrowserRouter>
                <AdoptPage></AdoptPage>
            </BrowserRouter>
        );
        const headingElement = screen.getByRole('heading', {
            name: /List of pets/i,
        });
        expect(headingElement).toBeInTheDocument();
    });
});
