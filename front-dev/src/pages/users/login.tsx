import React, { useState } from "react";
import styles from "../../styles/Form.module.css";
import Link from "next/link";
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from 'next/router';

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [post, setPost] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event: any) => {
    if(event.target.name ==="email"){
      const emailLowercase = event.target.value.toLowerCase();
    setPost({ ...post, [event.target.name]:emailLowercase });
    }{
      setPost({ ...post, [event.target.name]: event.target.value.toLowerCase()});
    }
  };

  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://companies-u6b0.onrender.com/api/users/auth", post);
      // After receiving the token from the server
        localStorage.setItem('token', response.data);
        // sessionStorage.setItem("token", JSON.stringify(response.data));
      router.push('/allCompany');
      
    } catch (err) {
      setError("Dados incorretos"); // Set the error message
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.h2}>Formulário de Login</h2>
        {error && <p className={styles.error}>{error}</p>} 
        <label htmlFor="email">Email:</label>
        <div className={styles.inputWithIcon}>
          <i>
            <FontAwesomeIcon icon={faEnvelope} />
          </i>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="Entre com seu email"
            onChange={handleInput}
            required
          />
        </div>
        <label className={styles.label} htmlFor="password">
          Senha:
        </label>
        <div className={styles.inputWithIcon}>
          <i onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </i>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Entre com a sua senha"
            onChange={handleInput}
            required
          />
        </div>
        <button className={styles.button} type="submit">
          Entrar
        </button>
        <p>
          Não possui uma conta? <Link href="/users/conta">Criar conta</Link>
        </p>
      </form>
    </div>
  );
};

export default Form;
