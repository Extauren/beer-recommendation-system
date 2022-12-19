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
                "title": "White",
                "message": "An easy-drinking, light style of beer, wheat beers are known for a soft, smooth flavor and a hazy body. Wheat beers tend to taste like spices or citrus, with the hefeweizen or unfiltered wheat beer being one of the more common styles."
            },{
                "title": "Abmer",
                "message": "Amber beer showcases a medium-high to high malt character with medium to low caramel character derived from the use of roasted crystal malts. The American amber is characterized by American-variety hops, which lend the amber ale notes of citrus, fruit and pine to balance the sweetness of the malt."

            }, {
                "title": "India Pale Ale (IPA)",
                "message": "Originally, India Pale Ale or IPA was a British pale ale brewed with extra hops. High levels of this bittering agent made the beer stable enough to survive the long boat trip to India without spoiling. The extra dose of hops gives IPA beers their bitter taste. Depending on the style of hops used, IPAs may have fruit-forward citrus flavors or taste of resin and pine. American brewers have taken the IPA style and run with it, introducing unusual flavors and ingredients to satisfy U.S. beer drinkers' love for the brew style."
            }, {
                "title": "Fruity",
                "message": "A fruit beer’s appearance should showcase the base beer style. In beers of a lighter color, such as lagers, the liquid may take on a shade of color, similar to, but often lighter than the color of the actual fruit. The head may also take on tinges of the fruit color. The beer can be hazy, whether this quality is perceived as ok or undesirable, depends on both the fruit used and the underlying beer style."
            }, {
                "title": "Hybrid",
                'message': "Hybrid beers do not follow the conventional thought that all beer is either an ale or a lager. Instead, hybrids borrow brewing practices from both types of beer; they're a little lager and a little ale. For instance, a beer fermented with ale yeast may be held at cooler temperatures typically reserved for lagers, or a lager yeast beer may be brewed as quickly and warm as an ale. This brewing technique imparts the characteristics of both beer categories to create unique styles that are not easily classified. Kolsch, altbier, steam beer, and cream ale are most commonly thought of as hybrid beers."
            }
        ],
        [
            {
                "title": "Alcohol in beer",
                "message": "There are 3-14 percentages of alcohol in a beer, with the average being 5 percent. However, The alcohol level is determined by the brewing process and the type of yeast used. If you use a highly active yeast, the alcohol level will be higher. The reverse will be true if you use a less active yeast."
            }, {
                "title": "",
                "message": "The alcohol by volume (ABV) measures the amount of ethanol, or pure alcohol, in a beverage and is expressed as a percentage of the total volume. It is a requirement by law in most countries that the manufacture, sale, and distribution of alcoholic beverages must list the ABV on the label. This gives the consumer an informed choice of the alcoholic range of the drink they purchase."
            }, {
                "title": "",
                "message": "So, if you drink 12 ounces (355 ml) of 5% ABV beer, you will have consumed 0.6 ounces (17 grams) of alcohol. The alcohol range in beer differs from the proof system used for hard liquor, which measures twice the percentage of alcohol by volume. In most cases, brewers use the ABV to list the alcohol content of their beers, as it’s a more accurate reflection of the amount of alcohol."
            }, {
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
                "message": "Organic beers are beers that contain organic-certified ingredients and follow organic-approved processes. The term is regulated by agencies like the USDA, and once a beer is certified organic, its label will typically indicate so. The organic logo doesn’t necessarily indicate the beer will taste better or be healthier than any other style of beer. Organic beer is beer that has been certified organic by a governing body such as the USDA. The USDA and other certifying agencies have a strict set of standards that brewers must meet to earn and maintain their organic certification."
            },
            {
                "title": "",
                "message": "Organic beer is beer that has been certified organic by a governing body such as the USDA. The USDA and other certifying agencies have a strict set of standards that brewers must meet to earn and maintain their organic certification."
            },
            {
                "title": "1. Proving the use of organic ingredients",
                "message": "Depending on the particular certification being claimed, breweries need to show documentation of the percentage of organic ingredients used in every batch of the beer they’re certifying. Organic ingredients will also be certified, confirming the lack of pesticides or other uncertified components."
            },
            {
                "title": "2. Use of organic-certified equipment",
                "message": "Even the tools and equipment used to brew organic beer need to be confirmed. To do this, brewers can either use specific equipment only for their organic beers, or they must clean the equipment between batches with an approved cleaning or purging system. This is to flush the system with organic material when switching from conventional production to organic production."
            },
            {
                "title": "3. Annual inspection",
                "message": "Breweries are typically inspected annually at a minimum to verify they are meeting all organic requirements. They also can be subjected to surprise inspections. These are different from health department inspections, and are purely to verify the items above, as well as other requirements for their unique organic certification. If a brewery were to fail this inspection, they would need to remove the organic logo from any affected beers, and reapply for the certification in the future."
            }
        ],[
            {   "title": "What is ibu ?",
                "message": "IBU, or International Bitterness Unit, is the index used to measure and understand how bitter your beer will turn out to be. Even though IBUs determine the bitterness of a beer, they are not a total indication of the beer’s quality. It is all a game of matching your personal preferences and understanding the math behind the system."
            },
            {
                "title": "What Is the IBU Range for Beer ?",
                "message": "The IBU level of beer ranges from 0 to 120. Technically, the bitterness can be higher, but the human palate is less able to detect differences above that range. As the IBUs number increases, the parts per million of iso-alpha acids and polyphenols register as more bitter on the tongue."
            },
            {
                "title": "Are Beers With Higher IBUs More Bitter ?",
                "message": "In theory, a high IBU beer will taste more bitter than one with a low IBU, but that is not always the case. Beer enthusiasts and homebrewers use the IBU count as one guideline, keeping in mind that flavor is subjective. Some beer drinkers have a high tolerance for bitterness or simply enjoy bitterness more as a flavor. The balance of sweetness and bitterness can also affect the tasting notes. A smoky stout beer, or an intense, heavy barleywine can incorporate higher IBUs without tasting as bitter as a light-bodied pale ale with the same IBU rating. This is because the beer's bitterness is balanced against the sweetness of the malts."
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
        <div className="w-3/4 flex justify-center">
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