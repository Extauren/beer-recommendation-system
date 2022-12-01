import React from 'react';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';

export default function Result() {
    const {state} = useLocation();

    return (
        <div>
            <div className="flex justify-center mt-32">
                <div>
                    <h1 className="font-bold text-2xl">Recommend Beer</h1>
                </div>
                <div className="mt-12">
                    {state.beerType}
                    {state.abv}
                    {state.isOrganic}
                </div>
                {/* <div className="">
                    <TextField />
                </div> */}
            </div>
        </div>    
    )
}