import './App.css'
import Comment from './components/Comment.jsx'
import UserInput from './components/UserInput.jsx'
import { ContextProvider } from './utility/DataContext'

function App() {

  return (
    <ContextProvider>
      <Comment/>
      <UserInput/>
    </ContextProvider>
  )
}

export default App
