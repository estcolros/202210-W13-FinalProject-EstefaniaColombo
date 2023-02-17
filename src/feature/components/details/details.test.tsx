/* eslint-disable testing-library/no-unnecessary-act */
import { Details } from './details';

import { act, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import {
    PetContext,
    PetContextStructure,
} from '../../../core/context/pets.context';
import { UserContextStructure } from '../../../core/context/user.context';
import { PET } from '../../data/petmock';

describe('Given "Detail" component', () => {
    let mockContext: PetContextStructure & UserContextStructure;
    const petsDetailed = PET;
    const handleUpdate = jest.fn();
    const robot = PET;
    describe('When it is instantiated without admin', () => {
        beforeEach(async () => {
            mockContext = {
                getAdmin: () => false,
                handleUpdate,
                petsDetailed,
            } as unknown as PetContextStructure & UserContextStructure;
            await act(async () => {
                render(
                    <PetContext.Provider value={mockContext}>
                        <BrowserRouter>
                            <Details handleUpdate={handleUpdate} item={robot} />
                        </BrowserRouter>
                    </PetContext.Provider>
                );
            });
        });
        test(`Then component should be render elements`, async () => {
            const title = screen.getByRole('heading', {
                name: petsDetailed.title,
            });

            expect(title).toBeInTheDocument();
        });
    });

    describe('When it has been render', () => {
        const handleUpdate = jest.fn();
        const robot = PET;
        test('Then Robot Update heading should appear', () => {
            render(
                <BrowserRouter>
                    <Details handleUpdate={handleUpdate} item={robot} />
                </BrowserRouter>
            );
            const heading = screen.getByRole('heading', {
                name: /Get to know your future pet better/i,
            });

            expect(heading).toBeInTheDocument();
        });
    });
});
