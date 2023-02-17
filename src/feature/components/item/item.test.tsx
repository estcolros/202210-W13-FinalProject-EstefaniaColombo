/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import {
    PetContext,
    PetContextStructure,
} from '../../../core/context/pets.context';
import { UserContextStructure } from '../../../core/context/user.context';
import { PET } from '../../data/petmock';
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
