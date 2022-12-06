import React from 'react';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import LiquidFillGauge from 'react-liquid-gauge';
import { interpolateRgb } from 'd3-interpolate';
import { color } from 'd3-color';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';

export default function Questionnaire(props: any) {
    const navigate = useNavigate();
    const [questions, setQuestion] = React.useState<any>(["What type of beer do you want ?", "How much alcohol do you want ?", "Do you want organic beer ?"]);
    const [options, setOptions] = React.useState<any>([["Lager", "Stout", "White", "Amber", "IPA", "Fruity"], ["Lite", "Normal", "Strong"], ["Yes", "No"]]);
    const [beerType, setBeerType] = React.useState<string>("");
    const [alcohol, setAlcohol] = React.useState<string>("");
    const [isOrganic, setIsOrganinc] = React.useState<string>("")
    const formFunctions = React.useState<Array<React.Dispatch<React.SetStateAction<string>>>>([setBeerType, setAlcohol, setIsOrganinc]);
    const [radius, setRadius] = React.useState<number>(550);
    const [value, setValue] = React.useState<number>(100 / questions.length);
    const [test, setTest] = React.useState<number>(100 / questions.length - 5);
    const interpolate = interpolateRgb('#FB923C', '#FB923C');
    const fillColor = interpolate(value / 100);
    const gradientStops = [
        {
            key: '0%',
            stopColor: color(fillColor).darker(0.5).toString(),
            stopOpacity: 1,
            offset: '0%'
        },
        {
            key: '50%',
            stopColor: fillColor,
            stopOpacity: 0.75,
            offset: '50%'
        },
        {
            key: '100%',
            stopColor: color(fillColor).brighter(0.5).toString(),
            stopOpacity: 0.5,
            offset: '100%'
        }
    ];

    const theme = createTheme({
      palette: {
        primary: {
          main: '#818cf8',
        },
      },
    });

    const getBeer = () => {
        axios.post("/recommendation", {
            "type": beerType, "organic": isOrganic, "abv": alcohol
        }).then((result: any) => {
            // console.log(result.data);
            navigate("/result", {replace: false, state: {'result': result.data}});
        }).catch((error: any) => {
            console.log(error)
        });
    }

    const goToPrevQuestion = () => {
        if (props.questionNb > 0) {
            props.setQuestionNb(props.questionNb - 1);
            setValue(value - test);
        }
    }

    const goToNextQuestion = () => {
        if (props.questionNb < questions.length - 1) {
            props.setQuestionNb(props.questionNb + 1);
            setValue(value + test);
        }
        else {
            getBeer();
        }
    }

    return (
        <div className="flex justify-center mt-32">
            <div className="">
                <div className="bottom-28 left-12 w-3/4 h-80 absolute z-10 ml-6">
                    <div className="flex justify-center mt-4 text-xl font-bold">
                        {questions[props.questionNb]}
                    </div>
                    <div className="flex justify-center mt-12">
                        <FormGroup>
                            <ThemeProvider theme={theme}>
                                <RadioGroup
                                   aria-labelledby="demo-radio-buttons-group-label"
                                   name="radio-buttons-group"
                                >
                                    <Grid
                                       container 
                                       spacing={{xs: 3, md: 3, xl: 3}}
                                       columns={{xs: 2, md: 2, xl: 2}}
                                       className="flex justify-center"
                                    >
                                        {options[props.questionNb].map((option: string, index: number) => (
                                            <Grid item key={index}>
                                                <FormControlLabel
                                                    value={option}
                                                    control={<Radio/>}
                                                    label={option}
                                                    onChange={e => formFunctions[0][props.questionNb](option)}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </RadioGroup>
                            </ThemeProvider>
                        </FormGroup>
                    </div>
                    { props.questionNb > 0 &&
                        <div className="absolute left-4 bottom-4">
                            <ThemeProvider theme={theme}>
                                <Button
                                    variant="contained" 
                                    startIcon={<ArrowBackIosIcon />}
                                    onClick={goToPrevQuestion}
                                >
                                    <p>Prev</p>
                                </Button>
                            </ThemeProvider>
                        </div>
                    }
                    <div className="absolute right-4 bottom-4">
                        <ThemeProvider theme={theme}>
                            <Button
                                variant="contained" 
                                endIcon={<ArrowForwardIosIcon />}
                                onClick={goToNextQuestion}
                            >
                                {props.questionNb === (questions.length - 1) ?
                                    <p>Get my Beer</p>
                                :
                                    <p>Next</p>
                                }
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
                <div className="z-0">
                    <LiquidFillGauge
                        style={{ margin: '0 auto' }}
                        width={radius * 1}
                        height={radius * 1}
                        value={value}
                        textSize={0}
                        textOffsetX={0}
                        textOffsetY={0}
                        textRenderer={(props: any) => {
                            const value = Math.round(props.value);
                            const radius = Math.min(props.height / 2, props.width / 2);
                            const textPixels = (props.textSize * radius / 2);
                            const valueStyle = {
                                fontSize: textPixels
                            };
                            const percentStyle = {
                                fontSize: textPixels * 0.6
                            };
                            return (
                                <tspan>
                                    <tspan className="value" style={valueStyle}>{value}</tspan>
                                    <tspan style={percentStyle}>{props.percent}</tspan>
                                </tspan>
                            );
                        }}
                        riseAnimation
                        waveAnimation
                        waveFrequency={2}
                        waveAmplitude={1}
                        gradient
                        gradientStops={gradientStops}
                        circleStyle={{
                            fill: fillColor
                        }}
                        waveStyle={{
                            fill: fillColor
                        }}
                        textStyle={{
                            fill: color('#444').toString(),
                            fontFamily: 'Arial'
                        }}
                        waveTextStyle={{
                            fill: color('#fff').toString(),
                            fontFamily: 'Arial'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}