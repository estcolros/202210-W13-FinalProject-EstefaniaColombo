import { Details } from './details';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { mockPet1 } from '../../hooks/pets/use.pets.mock';

describe('Given Pet Update component', () => {
    describe('When it has been render', () => {
        const handleUpdate = jest.fn();
        const pet = mockPet1;
        test('Then Pet Update heading should appear', () => {
            render(
                <BrowserRouter>
                    <Details handleUpdate={handleUpdate} item={pet} />
                </BrowserRouter>
            );
            const heading = screen.getByRole('heading', {
                name: /Pet details/i,
            });

            expect(heading).toBeInTheDocument();
        });
    });
});
