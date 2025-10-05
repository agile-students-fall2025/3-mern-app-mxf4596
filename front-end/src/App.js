import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Messages from './Messages'
import MessageStandalone from './MessageStandalone'
import Home from './Home'
import Header from './Header'
import Footer from './Footer'
import AboutUs from './AboutUs'  

const App = props => {
  return (
    <div className="App">
      <Router>
        <Header />
        <main className="App-main">
          <Routes>

            <Route path="/" element={<Home />} />


            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:messageId" element={<MessageStandalone />} />

            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}


export default App


