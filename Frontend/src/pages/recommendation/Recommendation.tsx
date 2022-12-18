import React from 'react';
import Questionnaire from './Questionnaire';
import Help from './Help';
import Grid from '@mui/material/Grid';

export default function Recommendation() {
    const [questionNb, setQuestionNb] = React.useState<number>(0);
    const [test, setTest] = React.useState<string>("");
    const [isMobile, setIsMobile] = React.useState<boolean>(false);

    React.useEffect(() => {
        console.log(window.innerWidth);
        if (window.innerWidth < 1920) {
            setIsMobile(true);
            setTest("mt-32");
        }
    }, [test, isMobile])

    return (
        <div className="">
            {/* <Grid
                container
                spacing={{xs: 2, md: 2, xl: 2}}
                columns={{xs: 2, md: 2, xl: 2}}
                className="flex justify-center"
            >
                <Grid item key="0" className="absolute 2xl:left-56 left-10 md:w-2/5 lg:w-2/5 xl:w-1/4 2xl:1/4"> */}
                <div className="">
                    <Questionnaire questionNb={questionNb} setQuestionNb={setQuestionNb} isMobile={isMobile}/>
                </div>
                {/* </Grid>
                <Grid item key="1" className={test}> */}
                <div className="flex justify-center mt-12">
                    <Help questionNb={questionNb}/>
                </div>
                {/* </Grid>
            </Grid> */}
        </div>
    )
}