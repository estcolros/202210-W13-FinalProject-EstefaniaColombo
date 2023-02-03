import { render } from '@testing-library/react';

import * as usePets from '../../feature/hooks/pets/use.pets';
import { PetContextProvider } from './pets.provider';
describe('Given PetContextProvider', () => {
    describe('When we use it', () => {
        test('Then it should call the  getPetsData()', () => {
            const handleLoadProductsSpy = jest.spyOn(usePets, 'usePets');
            render(
                <PetContextProvider>
                    <></>
                </PetContextProvider>
            );
            expect(handleLoadProductsSpy).toHaveBeenCalled();
        });
    });
});
