import { RouterProvider } from "react-router-dom"
import { router } from "./AppRouter"


function App() {

  return (
    <div className="font-serif">
    <RouterProvider router={router} />
  </div>
  )
}

export default App
