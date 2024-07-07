
const Login = () => {
    const REACT_APP_API_URL = 'http://localhost:3000'
    const googleAuth=()=>{
            window.open(
                `${REACT_APP_API_URL}/v1/auth/google/`,'_self'
            )
    }
    return (
        <>
        <button onClick={googleAuth}>login with google</button>
        </>
    );
}

export default Login;
