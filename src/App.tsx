import './App.css'
import Home from './components/Home'
import Editor from './components/Editor';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
    <Router>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Editor' element={<Editor/>} />
      </Routes>
    </Router>
    </main>
  )
}

export default App
