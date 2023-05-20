import React, { useState } from "react";
import styles from "../../styles/Form.module.css";
import Link from "next/link";
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";

import { FooterLinks } from "@/components/Footer";
import { HeaderMegaMenu } from "@/components/Header";

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

const [post, setPost] = useState({})

const [erros, setErros] =useState({})
const handleInpute =  (event:any)=>{
  if(event.target.name === "email"){
    const emailLowerCase = event.target.value.toLowerCase()
  setPost({...post, [event.target.name]: emailLowerCase})

  }else{
      setPost({...post, [event.target.name]: event.target.value})

  }

}
const handleSubmit = async (event: any) => {
  event.preventDefault();


 
  try {
    const response = await axios.post("https://companies-u6b0.onrender.com/api/users", post);
    router.push('/setEmpresa')
  } catch (err) {
    console.log(err);
  }
};

// Data to be passed in footer
const foot = [
  {
    title: 'Empresa',
    links: [
      { label: 'Página Inicial', link: '/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Serviços', link: '/about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Sobre Nós', link: '/about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contactos', link: '/about' },
    ],
  },
];


  return (
    <>
  
    <HeaderMegaMenu />
    <div className={styles.container}>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.h2}>Formulário de Cadastro</h2>

        <label htmlFor="name">Nome Completo:</label>
        <div className={styles.inputWithIcon}>
          <input
            className={styles.input}
            type="text"
            name="name"
            id="name"
            placeholder="Entre com seu nome"
           

            onChange={handleInpute}
            required
          />
        </div>

        <label htmlFor="email">Email:</label>
        <div className={styles.inputWithIcon}>
          <i>
            <FontAwesomeIcon icon={faEnvelope} />
          </i>
          <input
            className={styles.input}
            type="email"
            name="email"
            id="email"
            placeholder="Entre com seu email"
          
            onChange={handleInpute}
            required

          />
        </div>

        <label className={styles.label} htmlFor="password">
          Senha:
        </label>
        <div className={styles.inputWithIcon}>
          <i
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </i>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Entre com a sua senha"
           
            onChange={handleInpute}
            required

          />
        </div>

        {/* <label className={styles.label} htmlFor="conf_password">
          Confirmar senha:
        </label>
        <div className={styles.inputWithIcon}>
          <i
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </i>
          <input
            className={styles.input}
            type={showPassword ? "text" : "password"}
            id="conf_password"
            name="conf_password"
            placeholder="Entre com a sua senha"
            onChange={handleInpute}
            required

          />
        </div> */}

        <button className={styles.button} type="submit">
          Criar conta
        </button>
        <p>
          Já possui uma conta? <Link href="/users/login">Entrar</Link>
        </p>
      </form>
    </div>
    <FooterLinks data={foot} />
    </>
  );
};

export default Form;
