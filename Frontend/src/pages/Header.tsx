import BeerLogo from './../assets/beerLogo.png';

export default function Header() {
    return (
        <div className="w-full bg-indigo-400">
            <div className="flex inline-block">
                <img src={BeerLogo} className="h-16"/>
                <h1 className="font-bold mt-4 ml-2 text-xl">Beer Recommendation System</h1>
            </div>
        </div>
    )
}