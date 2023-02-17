/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { loginWithGoogle } from '../../../core/firebase/config';
import { UsersRepo } from '../../services/repository/user.repo';
import {
    mockUser1,
    mockUser2,
    mockAddUser,
    mockUpdateUser,
    // mockValidRepoResponse,
    // mockNoValidRepoResponse,
} from './testing.mock';

import * as debug from '../../../tools/debug';
import { User } from '../../models/users.model';

import * as users from './use.users';

jest.mock('@firebase/database');
jest.mock('../../../core/firebase/config');
jest.mock('../../services/repository/user.repo');

UsersRepo.prototype.load = jest.fn();
UsersRepo.prototype.create = jest.fn();
UsersRepo.prototype.update = jest.fn();
describe(`Given useUsers (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let spyConsole: jest.SpyInstance;
    let buttons: Array<HTMLElement>;
    beforeEach(async () => {
        (loginWithGoogle as jest.Mock).mockResolvedValue({
            name: 'sample',
            email: 'sample@gmail.com',
            getIdToken: '12345',
            user: {
                displayName: '',
                email: '',
                getIdToken: jest.fn(),
                uid: process.env.REACT_APP_FIREBASE_MARINA_UID,
            },
        });
        const userCredentialsMock = loginWithGoogle();
        TestComponent = () => {
            const { getAdmin, getStatus, getUsers, handleUser } =
                users.useUsers();
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
                    {getStatus() !== 'Loaded' ? (
                        <p>Loading</p>
                    ) : (
                        <div>
                            <p>Loaded</p>
                            <ul>
                                {getUsers().map((User: User) => (
                                    <li key={User.uid}>{User.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            );
        };
        await act(async () => {
            render(<TestComponent />);
        });
        buttons = screen.getAllByRole('button');
        spyConsole = jest.spyOn(debug, 'consoleDebug');
    });
});
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
