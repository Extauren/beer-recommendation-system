import React from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';

export default function Result() {
    const [index, setIndex] = React.useState<number>(0);
    const {state} = useLocation();
    const setSendReview = React.useState<any>(state.setSendReview);
    const [result, setResult] = React.useState<any>(state.result[index]);
    const [length, setLength] = React.useState<number>(state.result.length);
    const [userEval, setUserEval] = React.useState<string>("");
    const [userEvaluation, setUserEvaluation] = React.useState<Array<number>>([0, 1, 2, 3, 4]);
    const theme = createTheme({
        palette: {
          primary: {
            main: '#818cf8',
          },
        },
      });

    React.useEffect(() => {
        // state.setSendReview("test");
    }, [])

    const getUserEval = () => {

    }

    const sendReview = async () => {
        await axios.post("/recommendation/user_evaluation", {
            "beer_id": result.id, "user_evaluation": userEval
        }).then((response: any) => {
            console.log(response);
            //setSendReview("Thank you for reviewing your recommendation")
            setUserEval("");
        }).catch((error: any) => {
            console.log(error);
        });
    }

    const getAnotherBeer = () => {
        setResult(state.result[index + 1]);
        setIndex(index + 1);
    }

    return (
        <div>
            {result.name === "" ?
                <div>
                    no beer found
                </div>
            :
            <div>
            <div className="mt-20 mb-6">
                <Grid container spacing={4}>
                    <Grid item className="w-1/2">
                        <div className="flex justify-center mt-32">
                            <img src={result.icon} />
                        </div>
                    </Grid>
                    <Grid item className="w-1/2">
                        <div className="text-2xl font-bold md:ml-32 xl:ml-56 mt-8">
                            {result.name}
                        </div>
                        <div className="mt-12">
                            <p className="font-bold">Type :</p>
                            <div className="">
                                {result.type}
                            </div>
                        </div>
                        <div className="mt-4 w-3/4 text-ellipsis">
                            <p className="font-bold">Description :</p>
                            <div className="">
                                {result.description}
                            </div>
                        </div>
                        <div className="">
                            <div className="font-bold mt-4">Percentage of alcohol :</div>
                            <div>{result.abv} %</div>
                        </div>
                        <div>
                            <p className="font-bold mt-4">Is organic :</p>
                            { result.organic === 0 ?
                                <div>No</div>
                            :
                                <div>Yes</div>
                            }
                        </div>
                        <div>
                            <div className="font-bold mt-4">IBU :</div>
                            <div>{result.ibu} / 120</div>
                        </div>
                        <div>
                            <div className="font-bold mt-4">Recommendation percentage :</div>
                            <p>{result.percentage} %</p>
                        </div>
                        <div>
                            <div className="font-bold mt-4">User evaluation :</div>
                            <p>{userEvaluation[index]} points</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="flex justify-center">
                <ThemeProvider theme={theme}>
                    { index < length - 1 ?
                    
                        <Button
                            variant="contained"
                            onClick={getAnotherBeer}
                        >
                            Get another beer
                        </Button>
                    :
                        <Button
                            disabled
                            variant="contained"
                            onClick={getAnotherBeer}
                        >
                            Get another beer
                        </Button>
                    }
                </ThemeProvider>
            </div>
            <div className="flex justify-center mt-20 mb-12">
                <div className="">
                    <p className="text-xl font-bold mt-4 mr-12">Please review this recommendation</p>
                </div>
                <div className="flex justify-center">
                    <ThemeProvider theme={theme}>
                        <TextField value={userEval} onChange={e => {setUserEval(e.target.value)}}/>
                        <div className="ml-4 mt-2">
                            <Button 
                                onClick={sendReview}
                                variant="contained"
                            >
                                Send Review
                            </Button>
                        </div>
                    </ThemeProvider>
                </div>
            </div>
            </div>
            }
        </div>   
    )
}