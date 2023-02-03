import { render, screen } from '@testing-library/react';
import { Networks } from './networks';
describe('Given Address component', () => {
    describe('When it has been render', () => {
        test('Then the list should be in the screen', () => {
            render(<Networks />);
            const element = screen.getByRole('list');
            expect(element).toBeInTheDocument();
        });
    });
});
