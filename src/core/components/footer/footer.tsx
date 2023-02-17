import './footer.scss';

export function Footer() {
    return (
        <footer aria-label="footer">
            <address>
                Estefania Colombo Rosario | Final Project | ISDI Coders{' '}
                {new Date().toLocaleDateString()}
            </address>
            <p>©PetAdopt 2023</p>
        </footer>
    );
}
