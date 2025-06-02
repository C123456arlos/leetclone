import React from 'react'
import { BsChevronUp } from 'react-icons/bs'

type Props = {
    handleSubmit: () => void
}

const EditorFooter: React.FC<Props> = ({ handleSubmit }) => {
    return (
        <div className='flex bg-dark-layer-1 absolute bottom-0 z-10 w-full'>
            <div className='mx-5 my-[15px] flex justify-between w-full'>
                <div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
                    <button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm
                    hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2'>console
                        <div className='ml-1 transform transition flex items-center'>
                            <BsChevronUp className='fill-gray-6 mx-1 fill-dark-gray-6'></BsChevronUp>
                        </div>
                    </button>
                </div>
                <div className='ml-auto flex items-center space-x-4'>
                    <button className='px-3 py-1.5 text-sm font-medium items-center transition-all inline-flex bg-dark-fill-3 focus:outline-none
                    hover:bg-dark-fill-2 text-dark-label-2 rounded-lg' onClick={handleSubmit}>run
                    </button>
                    <button className='px-3 py-1.5 text-sm font-medium items-center transition-all inline-flex focus:outline-none
                    hover:bg-dark-fill-2 text-dark-label-2 rounded-lg text-white bg-dark-green-s' onClick={handleSubmit}>submit
                    </button>
                </div>

            </div>
        </div>
    )
}

export default EditorFooter