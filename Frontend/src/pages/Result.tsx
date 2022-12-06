import React from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { isConstructorDeclaration } from 'typescript';

export default function Result() {
    const [index, setIndex] = React.useState(0);
    const {state} = useLocation();
    const [result, setResult] = React.useState<any>(state.result[index]);
    const theme = createTheme({
        palette: {
          primary: {
            main: '#818cf8',
          },
        },
      });

    const getAnotherBeer = () => {
        setResult(state.result[index + 1]);
        setIndex(index + 1);
    }

    return (
        <div>
            <div className="mt-20 mb-6">
                <Grid container spacing={4}>
                    <Grid item className="w-1/2">
                        <div className="flex justify-center">
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
                            <div className="font-bold mt-4">Pourcentage of alcohol :</div>
                            <div>{result.abv} %</div>
                        </div>
                        <div>
                            <p className="font-bold mt-4">Is organic :</p>
                            { result.isOrganic === 0 ?
                                <p>No</p>
                            :
                                <p>Yes</p>
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className="flex justify-center xl:-mt-12">
                <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        onClick={getAnotherBeer}
                    >
                        Get another beer
                    </Button>
                </ThemeProvider>
            </div>
            <div className="flex justify-center mt-32">
                <div className="">
                    <p className="text-xl font-bold mt-4 mr-12">Please review this recommendation</p>
                </div>
                <div className="">
                    <TextField />
                </div>
            </div>
        </div>    
    )
}