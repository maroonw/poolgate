import { Link } from 'react-router-dom';

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">AquaPool Management!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Sunny Beach Town, AquaPool Management provides professional services to keep your pool clean and safe. We cater to both homeowners and pool professionals.</p>
                <address className="public__addr">
                    AquaPool Management<br />
                    123 Ocean Avenue<br />
                    Beach Town, FL 67890<br />
                    <a href="tel:+15551234567">(555) 123-4567</a>
                </address>
                <br />
                <p>Owner: Emily Waters</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    );
    return content;
};

export default Public;
