/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { usePets } from '../../hooks/pets/use.pets';
import { Pet } from '../../models/pet.model';

import { List } from './list';

jest.mock('../../hooks/pets/use.pets');

const mockName = 'Test name';
const mockImgUrl = 'Test imgUrl';

const mockRobot = new Pet(mockName, mockImgUrl);
describe('Given "List" component', () => {
    beforeEach(() => {
        (usePets as jest.Mock).mockReturnValue({
            robots: [mockRobot],
            handleLoad: jest.fn(),
            handleAdd: jest.fn(),
            handleDelete: jest.fn(),
            handleUpdate: jest.fn(),
        });
    });
    describe('When it is initially instantiated without data', () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <BrowserRouter>
                        <List></List>
                    </BrowserRouter>
                );
            });
        });
        test(`Then component should be render the loading`, () => {
            const elementTitle = screen.getByRole('heading', {
                name: 'List of pets',
            });
            const elementName = screen.getByText('Name');
            const elementVelocity = screen.getByText('Type');

            expect(elementTitle).toBeInTheDocument();
            expect(elementName).toBeInTheDocument();
            expect(elementVelocity).toBeInTheDocument();
        });
    });
});
