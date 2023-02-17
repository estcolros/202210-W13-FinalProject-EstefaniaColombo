/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pet } from '../../models/pet.model';
import { PetsRepository } from '../../services/repository/pets.repo';
import { usePets } from './use.pets';
import {
    mockAddPet,
    mockNoValidRepoResponse,
    mockPet1,
    mockPet2,
    mockUpdatePet,
    mockValidRepoResponse,
} from './use.pets.mock';
import * as debug from '../../../tools/debug';

jest.mock('firebase/storage');
jest.mock('../../../core/firebase/config');
jest.mock('../../services/repository/pets.repo.ts');

PetsRepository.prototype.load = jest.fn();
PetsRepository.prototype.create = jest.fn();
PetsRepository.prototype.update = jest.fn();
PetsRepository.prototype.delete = jest.fn();
describe(`Given usePets (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let spyConsole: jest.SpyInstance;
    let buttons: Array<HTMLElement>;
    beforeEach(async () => {
        const event = {
            preventDefault: jest.fn(),
            target: {
                files: [
                    {
                        name: 'test-file',
                    },
                ],
            },
        };
        TestComponent = () => {
            const {
                handleAdd,
                getStatus,
                getPets,
                handleLoad,
                handleUpdate,
                handleDelete,
            } = usePets();
            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={() => handleAdd(mockAddPet)}>Add</button>
                    <button onClick={() => handleUpdate(mockUpdatePet)}>
                        Update
                    </button>
                    <button onClick={() => handleDelete(mockPet2.id)}>
                        Delete
                    </button>

                    {getStatus() !== 'Loaded' ? (
                        <p>Loading</p>
                    ) : (
                        <div>
                            <p>Loaded</p>
                            <ul>
                                {getPets().map((pet: Pet) => (
                                    <li key={pet.id}>{pet.name}</li>
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
    describe(`When the repo is working OK`, () => {
        beforeEach(mockValidRepoResponse);
        test('Then its function handleAdd should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[1]);
            expect(PetsRepository.prototype.create).toHaveBeenCalled();
            expect(
                await screen.findByText(mockAddPet.name)
            ).toBeInTheDocument();
        });

        test('Then its function handleLoad should be add places to the state', async () => {
            expect(await screen.findByText(/loading/i)).toBeInTheDocument();
            userEvent.click(buttons[0]);
            expect(PetsRepository.prototype.load).toHaveBeenCalled();
            expect(await screen.findByText(mockPet1.name)).toBeInTheDocument();
            expect(await screen.findByText(mockPet2.name)).toBeInTheDocument();
        });

        test('Then its function handleUpdate should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[2]);
            expect(PetsRepository.prototype.update).toHaveBeenCalled();
            expect(
                await screen.findByText(mockUpdatePet.name)
            ).toBeInTheDocument();
        });

        test('Then its function handleDelete should be used', async () => {
            userEvent.click(buttons[0]);
            expect(PetsRepository.prototype.load).toHaveBeenCalled();
            userEvent.click(buttons[3]);
            expect(PetsRepository.prototype.delete).toHaveBeenCalled();
            expect(await screen.findByText(mockPet2.name)).toBeInTheDocument();

            await expect(
                async () => await screen.findByText(mockPet1.name)
            ).rejects.toThrowError();
        });
    });
    describe(`When the repo is NOT working OK`, () => {
        beforeEach(mockNoValidRepoResponse);
        test('Then its function handleLoad should be used', async () => {
            userEvent.click(buttons[0]);
            expect(PetsRepository.prototype.load).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleAdd should be used', async () => {
            userEvent.click(buttons[1]);
            expect(PetsRepository.prototype.create).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleUpdate should be used', async () => {
            userEvent.click(buttons[2]);
            expect(PetsRepository.prototype.update).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleDelete should be used', async () => {
            userEvent.click(buttons[3]);
            expect(PetsRepository.prototype.delete).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
    });
});
