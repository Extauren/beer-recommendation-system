import BeerLogo from './../assets/beerLogo.png';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
export default function Header() {

    return (
        <div className="w-full bg-indigo-400 h-14">
            <div className="flex inline-block">
                <Link to="/">
                    <div className="">
                        <img src={BeerLogo} className="h-16 -mt-1"/>
                    </div>
                </Link>
                <h1 className="font-bold mt-3.5 ml-2 text-xl">GlouGlou Intelligence</h1>
            </div>
        </div>
    )
}