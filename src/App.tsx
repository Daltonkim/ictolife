import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from 'react-redux'
import { routes } from './routes/routes'
import { store } from './store'

function App () {
  return (
    <Provider store={store}>
      {/* Routes ready */}
      <ToastContainer />
      <BrowserRouter basename="/">
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={route.component}
              />
            )
          })}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
