import React from 'react';
import Questionnaire from './Questionnaire';
import Help from './Help';
import Grid from '@mui/material/Grid';

export default function Recommendation() {
    const [questionNb, setQuestionNb] = React.useState<number>(0);

    return (
        <div>
            <Grid
                container 
                spacing={{xs: 2, md: 2, xl: 2}}
                columns={{xs: 2, md: 2, xl: 2}}
                className="flex justify-center"
            >
                <Grid item key="0" className="absolute 2xl:left-56 left-10 md:w-2/5 lg:w-2/5 xl:w-1/4 2xl:1/4">
                    <Questionnaire questionNb={questionNb} setQuestionNb={setQuestionNb}/>
                </Grid>
                <Grid item key="1" className="">
                    <Help questionNb={questionNb}/>
                </Grid>
            </Grid>
        </div>
    )
}