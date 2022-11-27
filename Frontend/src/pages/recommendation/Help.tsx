import React from 'react';

export default function Help() {
    const [help, setHelp] = React.useState<any>([
        {
            "title": "Larger",
            "message": "Lagers are a newer style of beer with two key differences from ales. Lagers ferment for a long time at a low temperature, and they rely on bottom-fermenting yeasts, which sink to the bottom of the fermenting tank to do their magic. Lagers are common among European countries, including Czechia, Germany, and the Netherlands, as well as in Canada, where they make up more than half of all beer sales."
        }, {
            "title": "Stout",
            "message": "Like porters, stouts are dark, roasted ales. Stouts taste less sweet than porters and often feature a bitter coffee taste, which comes from unmalted roasted barley that is added to the wort. They are characterized by a thick, creamy head. Ireland's Guinness may be one of the world's best-known stouts."
        }, {
            "title": "India Pale Ale (IPA)",
            "message": "Originally, India Pale Ale or IPA was a British pale ale brewed with extra hops. High levels of this bittering agent made the beer stable enough to survive the long boat trip to India without spoiling. The extra dose of hops gives IPA beers their bitter taste. Depending on the style of hops used, IPAs may have fruit-forward citrus flavors or taste of resin and pine. American brewers have taken the IPA style and run with it, introducing unusual flavors and ingredients to satisfy U.S. beer drinkers' love for the brew style."
        }])

    return (
        <div className="w-1/4">
            {help.map((info: any) => (
                <div>
                    <h2 className="font-bold">{info.title}</h2>
                    <p className="mt-2 mb-4">{info.message}</p>
                </div>
            ))}
        </div>
    )
}