/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/await-async-utils */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable testing-library/prefer-screen-queries */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import {
    PetContext,
    PetContextStructure,
} from '../../../core/context/pets.context';
import { UserContextStructure } from '../../../core/context/user.context';
import { USER } from '../../data/usermock';
import { Add } from './add';

describe('Given "Add" component', () => {
    describe('When we have actually current user', () => {
        const handleUpdateUser = jest.fn();
        let mockContext: PetContextStructure & UserContextStructure;
        beforeEach(async () => {
            mockContext = {
                admin: false,
                currentUser: USER,
                handleUpdateUser,
            } as unknown as PetContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <PetContext.Provider value={mockContext}>
                        <BrowserRouter>
                            <Add></Add>
                        </BrowserRouter>
                    </PetContext.Provider>
                );
            });
        });
        const mockName = 'Test name';
        const mockType = 'Test type';
        const mockSex = 'Test sex';
        const mockRace = 'Test race';
        let inputElementsTxt: Array<HTMLElement>;
        beforeEach(() => {
            inputElementsTxt = screen.getAllByRole('textbox');
        });
        test('Then form could be used for type content', () => {
            const title = screen.getByRole('heading', {
                name: `ADD PET`,
            });
            expect(title).toBeInTheDocument();
            expect(inputElementsTxt[0]).toBeInTheDocument();
            expect(inputElementsTxt[1]).toBeInTheDocument();
            expect(inputElementsTxt[2]).toBeInTheDocument();
            expect(inputElementsTxt[3]).toBeInTheDocument();
            expect(inputElementsTxt[4]).toBeInTheDocument();
            expect(inputElementsTxt[5]).toBeInTheDocument();
            userEvent.type(inputElementsTxt[2], mockName);
            userEvent.type(inputElementsTxt[3], mockType);
            userEvent.type(inputElementsTxt[4], mockSex);
            userEvent.type(inputElementsTxt[5], mockRace);
            expect(inputElementsTxt[2]).toHaveValue(mockName);
            expect(inputElementsTxt[3]).toHaveValue(mockType);
            expect(inputElementsTxt[4]).toHaveValue(mockSex);
            expect(inputElementsTxt[5]).toHaveValue(mockRace);
        });
        test('Then the button should be in the screen', () => {
            const submitButton = screen.getByRole('button', {
                name: 'add_circle',
            });
            expect(submitButton).toBeInTheDocument();
        });
    });
});
