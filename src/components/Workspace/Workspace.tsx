import React, { useState } from 'react'
import Split from 'react-split'
import Playground from './Playground/Playground'
import ProblemDescription from './ProblemDescription/ProblemDescription'
import { Problem } from '../../utils/types/problem'
import Confetti from 'react-confetti'
// import useWindowSize from '../../hooks/useWindowSize'
type Props = {
    problem: Problem
}

const Workspace: React.FC<Props> = ({ problem }) => {
    // const { width, height } = useWindowSize()
    const [success, setSuccess] = useState(false)
    const [solved, setSolved] = useState(false)
    return (
        <Split className='split' minSize={0}>
            <ProblemDescription problem={problem} _solved={solved}></ProblemDescription>
            <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved}></Playground>
            {success && <Confetti gravity={0.3} tweenDuration={4000}
            //  width={width -1}
            //  height={height -1}
            ></Confetti>}
        </Split>
    )
}

export default Workspace

