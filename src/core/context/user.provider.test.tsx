import { render } from '@testing-library/react';
import * as useUsers from '../../feature//hooks/users/use.users';
import { UserContextProvider } from './user.provider';

describe('Given PlaceContextProvider', () => {
    describe('When we use it', () => {
        test('Then it should call the custom hook usePlaces', () => {
            const spyuseArtworks = jest.spyOn(useUsers, 'useUsers');
            render(
                <UserContextProvider>
                    <></>
                </UserContextProvider>
            );
            expect(spyuseArtworks).toHaveBeenCalled();
        });
    });
});
