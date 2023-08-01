import './App.css'
import Feed from './components/Feed.jsx'
import UserInput from './components/UserInput.jsx'
import { ContextProvider } from './utility/DataContext'

function App() {

  return (
    <ContextProvider>
      <main>
        <Feed />
        <UserInput />
      </main>
    </ContextProvider>
  )
}

export default App
  