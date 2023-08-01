import './App.css'
import Feed from './components/Feed.jsx'
import UserInput from './components/UserInput.jsx'
import { ContextProvider } from './utility/DataContext'

function App() {

  return (
    <ContextProvider>
      <Feed/>
      <UserInput/>
    </ContextProvider>
  )
}

export default App
  