import React from 'react'
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';

export default function Questionnaire(props: any) {
    const [questions, setQuestion] = React.useState<any>(["What type of beer do you want ?", "How much alcool do you want ?", "Do you want organic beer ?"]);
    const [options, setOptions] = React.useState<any>([["Larger", "Stout", "White", "Amber", "IPA", "Fruity"], ["Lite", "Normal", "Strong"], ["Yes", "No"]]);
    const [questionNb, setQuestionNb] = React.useState<number>(0);

    const sendAnswer = () => {

    }

    const goToNextQuestion = () => {
        if (questionNb < questions.length - 1)
            setQuestionNb(questionNb + 1);
    }

    return (
        <div className="flex justify-center">
            <div className="md:w-2/4 lg:w-2/4 xl:w-1/4 h-80 border-2 rounded-lg shadow-md border-indigo-400">
                <div className="flex justify-center mt-4 text-xl font-bold">
                    {questions[questionNb]}
                </div>
                <div className="flex justify-center mt-12">
                    <FormGroup>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={options[questionNb][0]}
                            name="radio-buttons-group"
                        >
                        <Grid
                            container 
                            spacing={{xs: 3, md: 3, xl: 3}}
                            columns={{xs: 2, md: 2, xl: 2}}
                            className="flex justify-center"
                        >
                        {options[questionNb].map((option: string, index: number) => (
                            <Grid item key={index} >
                                <FormControlLabel 
                                    value={option} 
                                    control={<Radio />} 
                                    label={option}
                                />
                            </Grid>
                        ))}
                        </Grid>
                        </RadioGroup>
                    </FormGroup>
                </div>
                <div className="">
                    <Button
                        variant="outlined" 
                        endIcon={<ArrowForwardIosIcon />}
                        color="secondary"
                        onClick={goToNextQuestion}
                        className="top-20"
                    >
                        {questionNb === (questions.length - 1) ?
                            <p>Get my Beer</p>
                        :
                            <p>Next question</p>
                    }
                    </Button>
                </div>
            </div>
        </div>
    )
}