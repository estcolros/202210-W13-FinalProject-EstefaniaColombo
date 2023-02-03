import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import HomePage from '../../../feature/pages/home/home.page';
import { Layout } from './layout';

describe('Given Footer component', () => {
    describe('When we render the component', () => {
        test('Then it should display "Adopt a Pet Today"', () => {
            render(
                <>
                    <Router>
                        <Layout>
                            <HomePage />
                        </Layout>
                    </Router>
                </>
            );
            const element = screen.getByText(/Adoption/i);
            expect(element).toBeInTheDocument();
        });
    });
});
