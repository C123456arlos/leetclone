import React, { useEffect, useState } from 'react'
import { problems } from '../../mockProblems/problems'
import { BsCheckCircle } from 'react-icons/bs'
import Link from 'next/link'
import { AiFillYoutube } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import YouTube from 'react-youtube'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/firebase'
import { DBProblem } from '../../utils/types/problem'
import { useAuthState } from 'react-firebase-hooks/auth'
type Props = {
    setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
}
const ProblemsTable: React.FC<Props> = ({ setLoadingProblems }) => {
    const [youtubePlayer, setYoutubePlayer] = useState({
        isOpen: false,
        videoId: ''
    })
    const problems = useGetProblems(setLoadingProblems)
    const solvedProblems = useGetSolvedProblems()
    console.log('solvedPorblems', solvedProblems)
    const closeModal = () => {
        setYoutubePlayer({ isOpen: false, videoId: '' })
    }
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal()
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [])
    return (<>
        <tbody className='text-white'>
            {problems.map((problem, idx) => {
                const difficultyColor = problem.difficulty === 'Easy' ? 'text-dark-green-s' : problem.difficulty === 'Medium' ? 'text-dark-yellow' : 'text-dark-pink'
                return (
                    <tr className={`${idx % 2 == 1 ? 'bg-dark-layer-1' : ''}`} key={problem.id}>
                        <th className='px-2 py-4 font-medium whitespace-nowrap text-dark-green-s'>
                            {solvedProblems.includes(problem.id) && <BsCheckCircle fontSize={'18'} width='18'></BsCheckCircle>}
                        </th>
                        <td className='px-6 py-4'>
                            {problem.link ? (<Link href={problem.link} className='hover:text-blue-600 cursor-pointer' target='_blank'>
                                {problem.title}</Link>) : (
                                <Link className='hover:text-blue-600 cursor-pointer' href={`/problems/${problem.id}`}>{problem.title}</Link>)}</td>
                        <td className={`px-6 py-4 ${difficultyColor}`}>{problem.difficulty}</td>
                        <td className={'px-6 py-4'}>{problem.category}</td>
                        <td className={'px-6 py-4'}>{problem.videoId ? (<AiFillYoutube fontSize={'28'} className='hover:text-red-600 cursor-pointer'
                            onClick={() => setYoutubePlayer({ isOpen: true, videoId: problem.videoId as string })}></AiFillYoutube>) :
                            (<p className='text-gray-400'>coming soon</p>)}
                        </td>
                    </tr>
                )
            })}
        </tbody>
        {youtubePlayer.isOpen && (
            <tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
                <div className='bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute' onClick={closeModal}></div>
                <div className='w-full z-50 h-full px-6 relative max-w-4xl'>
                    <div className='w-full h-full flex items-center justify-center relative'>
                        <div className='w-full relative'>
                            <IoClose fontSize={'15'} className='cursor-pointer absolute top-16 right-0'
                                onClick={closeModal}></IoClose>
                            <YouTube videoId={youtubePlayer.videoId} loading='lazy' iframeClassName='w-full min-h-[500px]'></YouTube>
                        </div>
                    </div>
                </div>
            </tfoot>
        )}
    </>
    )
}

export default ProblemsTable



function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
    const [problems, setProblems] = useState<DBProblem[]>([])
    useEffect(() => {
        const getProblems = async () => {
            setLoadingProblems(true)
            const q = query(collection(firestore, 'problem'), orderBy('order', 'asc'))
            const querySnapshot = await getDocs(q)
            const tmp: DBProblem[] = []
            querySnapshot.forEach((problem) => (
                tmp.push({ id: problem.id, ...problem.data() } as DBProblem)
            ))
            // console.log(problem.id, '=>', problem.data()))
            setProblems(tmp)
            setLoadingProblems(false)
        }
        getProblems()
    }, [setLoadingProblems])
    return problems
}


function useGetSolvedProblems() {
    const [solvedProblems, setSolvedProblems] = useState<string[]>([])
    const [user] = useAuthState(auth)
    useEffect(() => {
        const getSolvedProblems = async () => {
            const userRef = doc(firestore, 'users', user!.uid)
            const userDoc = getDoc(userRef)
            if ((await userDoc).exists()) {
                setSolvedProblems((await userDoc).data().solvedProblems)
            }
        }
        if (user) getSolvedProblems()
        if (!user) setSolvedProblems([])
    }, [user])
    return solvedProblems
}