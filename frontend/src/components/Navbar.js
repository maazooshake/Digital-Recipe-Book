import { Link } from 'react-router-dom'
import pagepicture from '../images/pagepicture.png'
import borger from '../images/borger.png'
import food3 from '../images/food3.png'
import food4 from '../images/food4.png'


const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Your Digital Recipe Book</h1>
                    <img src={pagepicture} alt="PagePicture" className="page-picture" />
                    <img src={borger} alt="Borger" className="borger" />
                    <img src={food3} alt="food3" className="food3" />
                    <img src={food4} alt="food4" className="food4" />
                    
                </Link>
            </div>
        </header>
    )
}

export default Navbar