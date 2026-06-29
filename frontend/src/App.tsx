import { useStore } from './store'
import './App.css'

function App() {
  const bears = useStore((state) => state.bears)
  const increasePopulation = useStore((state) => state.increasePopulation)
  const removeAllBears = useStore((state) => state.removeAllBears)

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full text-center p-8">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-sm">
        React + TS + Tailwind + Zustand
      </h1>
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl max-w-lg w-full transition-all hover:scale-[1.02] duration-300">
        <h2 className="text-2xl font-semibold mb-6 text-gray-100">
          Bear Population: <span className="text-pink-400 font-bold ml-2 text-4xl">{bears}</span>
        </h2>
        <div className="flex gap-4 justify-center mt-8">
          <button 
            onClick={increasePopulation}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform transition-all active:scale-95"
          >
            Add Bear 🐻
          </button>
          <button 
            onClick={removeAllBears}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl shadow-lg border border-white/20 transform transition-all active:scale-95"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
