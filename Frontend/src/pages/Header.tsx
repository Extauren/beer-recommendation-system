import BeerLogo from './../assets/beerLogo.png';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="w-full bg-indigo-400">
            <div className="flex inline-block">
                <Link to="/">
                    <img src={BeerLogo} className="h-16"/>
                </Link>
                <h1 className="font-bold mt-4 ml-2 text-xl">GlouGlou Intelligence</h1>
            </div>
        </div>
    )
}