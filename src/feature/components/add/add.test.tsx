/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createContext, useContext } from 'react';
import { Add } from './add';

describe('Given "Add" component in "Publish" page', () => {
    const handleAdd = jest.fn();

    beforeEach(() => {
        render(<Add></Add>);
    });

    describe('When component is call with a DOM implementation', () => {
        test(`Then it should be render with its title`, () => {
            const addTitle = screen.getByRole('heading', {
                name: 'Information Pet',
            });

            expect(addTitle).toBeInTheDocument();
        });
    });

    describe('When data are provided in the form', () => {
        const mockName = 'Test name';
        const mockType = 'Test type';
        const mockSize = 'Test size';
        const mockSex = 'Test sex';
        let inputElements: Array<HTMLElement>;
        let elementButton: HTMLElement;
        beforeEach(() => {
            inputElements = screen.getAllByRole('textbox');
            elementButton = screen.getByRole('button');
        });
        test('Then form could be used for type content', () => {
            expect(inputElements[0]).toBeInTheDocument();
            expect(inputElements[1]).toBeInTheDocument();
            expect(inputElements[2]).toBeInTheDocument();
            expect(inputElements[3]).toBeInTheDocument();
            userEvent.type(inputElements[0], mockName);
            userEvent.type(inputElements[1], mockType);
            userEvent.type(inputElements[2], mockSize);
            userEvent.type(inputElements[3], mockSex);
            expect(inputElements[0]).toHaveValue(mockName);
            expect(inputElements[1]).toHaveValue(mockType);
            expect(inputElements[2]).toHaveValue(mockSize);
            expect(inputElements[3]).toHaveValue(mockSex);
        });
        test('Then form could be used for send the function received in props', () => {
            userEvent.type(inputElements[0], mockName);
            userEvent.type(inputElements[1], mockType);
            userEvent.type(inputElements[2], mockSize);
            userEvent.type(inputElements[3], mockSex);
            userEvent.click(elementButton);
            expect(handleAdd).toHaveBeenCalled();
        });
        test('Then form could be used also without value for responsible', () => {
            userEvent.type(inputElements[0], mockName);
            userEvent.click(elementButton);
            expect(handleAdd).toHaveBeenCalled();
        });
    });
});
