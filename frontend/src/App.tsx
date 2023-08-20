import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import { useRecoilValue } from "recoil";
import Header from "./components/header/Header";
import Homepage from "./components/homepage/Homepage";
import { userLoggedInState } from "./recoil/userAtom";
import Note from "./components/note/Note";

function App() {
  const userLoggedIn = useRecoilValue(userLoggedInState);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={userLoggedIn ? <Homepage /> : <Signup />} />
          {userLoggedIn ? (
            <>
              {/* Other authenticated routes */}
              <Route path="/note/:id" element={<Note />} />
            </>
          ) : (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;