import React from 'react';
import Questionnaire from './Questionnaire';
import Help from './Help';
import Alert from '@mui/material/Alert';

export default function Recommendation() {
    const [questionNb, setQuestionNb] = React.useState<number>(0);
    const [test, setTest] = React.useState<string>("");
    const [isMobile, setIsMobile] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [sendReview, setSendReview] = React.useState<string>("");

    React.useEffect(() => {
        console.log(window.innerWidth);
        if (window.innerWidth < 500) {
            setIsMobile(true);
            setTest("mt-32");
        }
    }, [test, isMobile])

    return (
        <div className="">
            { errorMessage !== "" ?
                <div className="flex justify-center mt-12">
                    <Alert severity="error"><p className="font-bold text-md">{errorMessage}</p></Alert>
                </div>
                :
                null
            }
            { sendReview !== "" ?
                <div className="flex justify-center mt-12">
                    <Alert severity="success"><p className="font-bold text-md">{sendReview}</p></Alert>
                </div>
                :
                null
            }
            <div className="">
                <Questionnaire questionNb={questionNb} setQuestionNb={setQuestionNb} isMobile={isMobile} setErrorMessage={setErrorMessage} setSendReview={setSendReview}/>
            </div>
            <div className="flex justify-center mt-28 mb-12">
                <Help questionNb={questionNb}/>
            </div>
        </div>
    )
}