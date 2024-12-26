// import { Card } from "./Components/Card"
import { Header } from "./Components/Header"
import { Footer } from "./Components/Footer"
import { AllRoutes } from "./Routes/AllRoutes"

function App() {

  return (
    <>
    <div className="bg-black">
      <Header/>
        <AllRoutes />
      <Footer/>
    </div>
    </>
  )
}

export default App
