import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect } from 'react';
import { MemoryRouter as Router } from 'react-router';
import { USER } from '../../../feature/data/usermock';
import { PetContext, PetContextStructure } from '../../context/pets.context';
import { UserContext, UserContextStructure } from '../../context/user.context';
import { Header } from './header';

jest.mock('../../firebase/config');
describe('Given Header component', () => {
    let mockContext: PetContextStructure & UserContextStructure;
    const handleCurrentUser = jest.fn();
    beforeEach(async () => {
        mockContext = {
            handleCurrentUser,
            currentUser: {},
        } as unknown as PetContextStructure & UserContextStructure;
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            render(
                <PetContext.Provider value={mockContext}>
                    <Router>
                        <Header>
                            <></>
                        </Header>
                    </Router>
                </PetContext.Provider>
            );
        });
    });
    test('Then elements should be in the screen', () => {
        const elementHeader = screen.getByRole('heading', {
            name: 'PetAdopt',
        });
        const loginBtn = screen.getByRole('button', {
            name: 'Log in',
        });
        expect(elementHeader).toBeInTheDocument();
        expect(loginBtn).toBeInTheDocument();
    });
    test('Then on click login button should navigate to Login', () => {
        const navigate = jest.fn();
        const currentUser = {};
        const loginBtn = screen.getByRole('button', {
            name: 'Log in',
        });
        userEvent.click(loginBtn);
        renderHook(() =>
            useEffect(() => {
                if (Object.keys(currentUser).length === 0) {
                    navigate('/login');
                }
            }, [])
        );
        expect(navigate).toHaveBeenCalledWith('/login');
    });

    describe('When Header components renders with current User', () => {
        beforeEach(async () => {
            mockContext = {
                currentUser: USER,
                handleCurrentUser,
            } as unknown as PetContextStructure & UserContextStructure;
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                render(
                    <UserContext.Provider value={mockContext}>
                        <Router>
                            <Header>
                                <></>
                            </Header>
                        </Router>
                    </UserContext.Provider>
                );
            });
        });
        test('Then the button should be in the screen', () => {
            const loginOutBtn = screen.getByRole('button', {
                name: 'Log out',
            });
            expect(loginOutBtn).toBeInTheDocument();
        });
        test('Then on click login button should navigate to Login', () => {
            const loginBtn = screen.getByRole('button', {
                name: 'Log out',
            });
            userEvent.click(loginBtn);
            expect(handleCurrentUser).toHaveBeenCalled();
        });
    });
});
