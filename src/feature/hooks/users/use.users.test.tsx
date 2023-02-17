/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loginWithGoogle } from '../../../core/firebase/config';
import { UsersRepo } from '../../services/repository/user.repo';

import * as users from './use.users';

jest.mock('@firebase/database');
jest.mock('../../../core/firebase/config');
jest.mock('../../services/repository/pets.repo');

UsersRepo.prototype.load = jest.fn();
UsersRepo.prototype.create = jest.fn();
UsersRepo.prototype.update = jest.fn();

describe(`Given useUsers render with a virtual component for No ADMIN`, () => {
    let TestComponent: () => JSX.Element;
    let button: HTMLElement;
    beforeEach(async () => {
        (loginWithGoogle as jest.Mock).mockResolvedValue({
            name: 'sample',
            email: 'sample@gmail.com',
            getIdToken: '12345',
            user: {
                displayName: '',
                email: '',
                getIdToken: jest.fn(),
                uid: '',
            },
        });
        const userCredentialsMock = loginWithGoogle();
        TestComponent = () => {
            const { getAdmin, handleUser } = users.useUsers();
            return (
                <>
                    <button
                        onClick={async () =>
                            handleUser(await userCredentialsMock)
                        }
                    >
                        handleUser
                    </button>
                    <h1>{getAdmin() ? 'true' : 'false'}</h1>
                </>
            );
        };
        await act(async () => {
            render(<TestComponent />);
        });
        button = screen.getByRole('button');
    });
    describe(`When the repo is working OK`, () => {
        test('Then its function handleUser should be used', async () => {
            userEvent.click(button);
            const admin = screen.getByText('false');
            await act(async () => {
                expect(admin).toBeInTheDocument();
            });
        });
    });
});
