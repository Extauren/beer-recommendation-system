import React from 'react';
import Grid from '@mui/material/Grid';

export default function Help(props: any) {
    const [help, setHelp] = React.useState<any>([
        [
            {
                "title": "Lager",
                "message": "Lagers are a newer style of beer with two key differences from ales. Lagers ferment for a long time at a low temperature, and they rely on bottom-fermenting yeasts, which sink to the bottom of the fermenting tank to do their magic. Lagers are common among European countries, including Czechia, Germany, and the Netherlands, as well as in Canada, where they make up more than half of all beer sales."
            }, {
                "title": "Stout",
                "message": "Like porters, stouts are dark, roasted ales. Stouts taste less sweet than porters and often feature a bitter coffee taste, which comes from unmalted roasted barley that is added to the wort. They are characterized by a thick, creamy head. Ireland's Guinness may be one of the world's best-known stouts."
            }, {
                "title": "India Pale Ale (IPA)",
                "message": "Originally, India Pale Ale or IPA was a British pale ale brewed with extra hops. High levels of this bittering agent made the beer stable enough to survive the long boat trip to India without spoiling. The extra dose of hops gives IPA beers their bitter taste. Depending on the style of hops used, IPAs may have fruit-forward citrus flavors or taste of resin and pine. American brewers have taken the IPA style and run with it, introducing unusual flavors and ingredients to satisfy U.S. beer drinkers' love for the brew style."
            }, {
                "title": "White",
                "message": "An easy-drinking, light style of beer, wheat beers are known for a soft, smooth flavor and a hazy body. Wheat beers tend to taste like spices or citrus, with the hefeweizen or unfiltered wheat beer being one of the more common styles."
            }
        ],
        [
            {
                "title": "Lite",
                "message": "Beer with less than 4% of alcohol"
            },
            {
                "title": "Normal",
                "message": "Beer between 5% and 6% of alcohol"
            },
            {
                "title": "Strong",
                "message": "Beer with more than 7% of alcohol"
            }
        ],
        [
            {
                "title": "What is an organic beer ?",
                "message": "In its simplest form, organic beer is any beer brewed using organic ingredients. The malt, hops, yeast, flavorings, and adjuncts must have an organic label."
            }
        ],[
            {   "title": "What is ibu ?",
                "message": "IBU, or International Bitterness Unit, is the index used to measure and understand how bitter your beer will turn out to be. Even though IBUs determine the bitterness of a beer, they are not a total indication of the beer’s quality. It is all a game of matching your personal preferences and understanding the math behind the system."
            },
            {
                "title": "Low",
                "message": "between 5 and 30"
            },
            {
                "title": "Medium",
                "message": "between 30 and 50"
            },
            {
                "title": "Hight",
                "message": "Highter than 50"
            }

        ],[]]);

    return (
        <div className="w-3/4">
            <Grid
                container 
                spacing={{xs: 3, md: 3, xl: 3}}
                columns={{xs: 2, md: 2, xl: 2}}
                className="flex justify-center"
            >
                {help[props.questionNb].map((info: any, index: number) => (
                    <Grid item key={index} className="">
                        <h2 className="font-bold">{info.title}</h2>
                        <p className="mt-2 mb-4">{info.message}</p>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}