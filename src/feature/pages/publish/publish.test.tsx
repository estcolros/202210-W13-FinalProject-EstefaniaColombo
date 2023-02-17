import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import PublishPage from './publish.page';
import { BrowserRouter } from 'react-router-dom';
import {
    PetContext,
    PetContextStructure,
} from '../../../core/context/pets.context';
import { UserContextStructure } from '../../../core/context/user.context';
import { USER } from '../../data/usermock';

describe('Given PublishPage component', () => {
    describe('When it has been render', () => {
        test('Then the title should be in the screen', () => {
            render(
                <BrowserRouter>
                    <PublishPage></PublishPage>
                </BrowserRouter>
            );
            const elementHeader = screen.getByRole('heading', {
                name: 'Publish new pets',
            });
            expect(elementHeader).toBeInTheDocument();
        });
    });

    describe('When Admin is false', () => {
        let mockContext: PetContextStructure & UserContextStructure;
        const getAdmin = jest.fn();
        beforeEach(async () => {
            mockContext = {
                admin: false,
                getAdmin,
                currentUser: USER,
            } as unknown as PetContextStructure & UserContextStructure;
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                render(
                    <PetContext.Provider value={mockContext}>
                        <Router>
                            <PublishPage></PublishPage>
                        </Router>
                    </PetContext.Provider>
                );
            });
        });
        test('Then section with role article should be in screen', () => {
            const div = screen.getByRole('article');
            expect(div).toBeInTheDocument();
        });
        test('Then the component Pets should be rendered', () => {
            const title = screen.getByRole('heading', {
                name: `You don't have permission to publish any pets`,
            });
            expect(title).toBeInTheDocument();
        });
    });
});
