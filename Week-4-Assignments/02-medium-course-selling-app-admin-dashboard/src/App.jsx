import {Routes,Route} from 'react-router-dom'
import Signup from './assets/components/Signup'
import Login from './assets/components/Login'

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/signup' element={<Signup />} ></Route>
                <Route path = '/login' element = {<Login/>}></Route>
                </Routes>
        </>
    )
}

export default App