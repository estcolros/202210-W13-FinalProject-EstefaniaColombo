import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import { Header } from './header';

describe('Given Header component', () => {
    describe('When it has been render', () => {
        test('Then the title should be in the screen', () => {
            render(
                <Router>
                    <Header>
                        <></>
                    </Header>
                </Router>
            );
            const elementHeader = screen.getByRole('heading', {
                name: 'PetAdopt',
            });
            expect(elementHeader).toBeInTheDocument();
        });
    });
});
