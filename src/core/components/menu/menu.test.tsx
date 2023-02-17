import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import { items } from '../routes/mocks';
import { Menu } from './menu';
describe('Given Menu component', () => {
    describe('When it has been render', () => {
        test('Then the elements should be in the document', () => {
            render(
                <Router>
                    <Menu items={items}></Menu>
                </Router>
            );
            const link1 = screen.getByRole('link', {
                name: 'Home',
            });
            const link2 = screen.getByRole('link', {
                name: 'Adopt',
            });
            const link3 = screen.getByRole('link', {
                name: 'Favorites',
            });
            expect(link1).toBeInTheDocument();
            expect(link2).toBeInTheDocument();
            expect(link3).toBeInTheDocument();
        });
    });
});
