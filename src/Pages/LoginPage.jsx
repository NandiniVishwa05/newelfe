import React, { useState } from 'react'
import './../Styles/LoginPage.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const validateInput = () => {
        let element = document.getElementsByClassName('inputfield');
        let err = 0;
        if (username == "") {
            toast.error("This is required field !");
            element[0].style.border = "1px solid red"
            err++;
        } else {
            element[0].style.border = "1px solid #1B6392"
        }
        if (password == "") {
            toast.error("This is required field !");
            element[1].style.border = "1px solid red"
            err++;
        } else {
            element[1].style.border = "1px solid #1B6392"
        }
        if (err == 0) {
            checkUser();
        }
    }
    const checkUser = async () => {
        //console.log(username);
        let element = document.getElementsByClassName('inputfield');

        let res = await fetch("https://newelbe.onrender.com/checkuser", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        });
        res = await res.json();
        //console.log(res);
        if (res.msg === "validuser") {
            element[1].style.border = "1px solid #1B6392"
            navigate('/listpage');
        } else {
            element[0].style.border = "1px solid red"
            element[1].style.border = "1px solid red"

            toast.error("Invalid Credentials")
        }
    }

    return (
        <>
            <div className="nv-grid-column nv-h-center loginpagemainwrapper">
                <div className='loginnotewrapper'><p>Note : Use Username = " user " and Password = " root " for further test.</p></div>
                <div className="nv-grid-column loginpagewrapper">
                    <div className="nv-v-center loginheaderwrapper"><h1 className='loginheader'>LOGIN</h1></div>
                    <div className="nv-grid-column loginbodywrapper">
                        <div className="logininputwrapper">
                            <h3 className='loginheader'>Username</h3>
                            <input type="text" name="username" className="inputfield" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="logininputwrapper">
                            <h3 className='loginheader'>Password</h3>
                            <input type="password" name="password" className='inputfield' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="nv-v-center loginbuttonwrapper"><button onClick={validateInput}>Submit</button></div>
                </div>
            </div>
        </>
    )
}
