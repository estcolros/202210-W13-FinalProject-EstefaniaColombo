/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Pet } from '../../models/pet.model';
import { Item } from './item';

describe('Given Pet component', () => {
    const mockRobotName = 'Test name';
    const mockImage = 'Test image';

    const mockRobot = new Pet(mockRobotName, mockImage);

    describe('When it has been render', () => {
        test('Then the title should be in the screen', () => {
            render(
                <BrowserRouter>
                    <Item item={mockRobot}></Item>
                </BrowserRouter>
            );
            const textElement = screen.getByText(/Name:/i);
            expect(textElement).toBeInTheDocument();
        });
    });
});
