import { useEffect } from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userLoggedInState } from '../../recoil/userAtom';

function Header() {
    const navigate = useNavigate();
    const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(userLoggedInState);

    const handleLogout = () => {
        localStorage.removeItem('token')
        setUserIsLoggedIn(false)
        navigate('/login');
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setUserIsLoggedIn(true);
        } else {
            setUserIsLoggedIn(false);
        }
    }, [userIsLoggedIn]);

    return (
        <header>
            <div onClick={() => navigate('/')}>
                <a href='#' className='logo josefin-font'>
                    Celestial Notes
                </a>
            </div>
            <div>
                {userIsLoggedIn ? (
                    <button className='logoutbtn' onClick={() => handleLogout()}>
                    Logout
                    </button>
                ) : (
                    <>
                        <button className='loginbtn' onClick={() => navigate('/login')}>
                            Login
                        </button>
                        <button className='signupbtn' onClick={() => navigate('/signup')}>
                            Sign up
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;