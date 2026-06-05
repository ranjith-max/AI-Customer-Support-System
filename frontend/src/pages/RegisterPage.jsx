import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./RegisterPage.css"

function RegisterPage() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        try {

            await registerUser(
                name,
                email,
                password
            );

            alert("Registration Successful!");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>Register</h1>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button onClick={handleRegister}>
                    Register
                </button>

            </div>

        </div>
    );
}

export default RegisterPage;