import { Link } from 'react-router-dom';

export default function NavBar() {
    return(
        <nav>
            <ul>
                <Link to='/'><li>Home</li></Link>
                <Link to='/radio'><li>Radio</li></Link>
            </ul>
        </nav>
    )
}