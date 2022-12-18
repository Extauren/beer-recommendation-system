import React from 'react';
import Questionnaire from './Questionnaire';
import Help from './Help';

export default function Recommendation() {
    const [questionNb, setQuestionNb] = React.useState<number>(0);
    const [test, setTest] = React.useState<string>("");
    const [isMobile, setIsMobile] = React.useState<boolean>(false);

    React.useEffect(() => {
        console.log(window.innerWidth);
        if (window.innerWidth < 500) {
            setIsMobile(true);
            setTest("mt-32");
        }
    }, [test, isMobile])

    return (
        <div className="">
            <div className="">
                <Questionnaire questionNb={questionNb} setQuestionNb={setQuestionNb} isMobile={isMobile}/>
            </div>
            <div className="flex justify-center mt-28 mb-12">
                <Help questionNb={questionNb}/>
            </div>
        </div>
    )
}