import { PlayIcon } from "./Decorations"
import main from "../../assets/main.png"
import { Stars, Curves } from './Decorations';

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-20 relative overflow-hidden">
      <div className='absolute top-0 right-80'>
        <Stars />
      </div>
      <div className='absolute top-73 left-94'>
        <Curves />
      </div>
      <div className='absolute top-40 right-10 md:right-20'>
        <Stars />
      </div>
      <div className='absolute bottom-40 right-32 md:right-72'>
        <Curves />
      </div>
      <div className="max-w-full flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div>
          <h1 className="text-6xl font-bold leading-tight mb-6 dark:text-white">
            Learn Smarter with AI, <span className="bg-[#ADFF00] px-2 font-['Dancing_Script']">achieve</span> more together.
          </h1>
          <p className="text-gray-600 dark:text-gray-500 text-xl mb-12">
            Experience personalized learning with AI-driven paths, multilingual support, and 
            interactive features. Join a community where accessibility meets innovation.
          </p>
          <div className="flex items-center gap-8">
            <button className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100">
              Start Learning
            </button>
            <button className="flex items-center gap-2 dark:text-white cursor-pointer hover:text-gray-600 dark:hover:text-gray-300">
              <span>Watch Demo</span>
              <PlayIcon />
            </button>
          </div>
        </div>
        <img src={main} alt="Main" className="w-full md:w-1/2" />
      </div>
    </div>
  )
}

