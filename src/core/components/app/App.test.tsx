import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, Router } from 'react-router-dom';

describe('Given App component', () => {
    describe('When it has been render', () => {
        test('Then its child components should be render also with its title', async () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                render(
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                );
            });
            const elementHeader = screen.getByRole('heading', {
                name: 'PetAdopt',
            });
            expect(elementHeader).toBeInTheDocument();
        });
    });
});
