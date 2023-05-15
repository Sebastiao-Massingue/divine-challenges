import styles from "../styles/CompanyForm.module.css";

import { useState } from "react";



export default function CompanyForm() {

  const [file, setFile] =useState(null)
  const [post, setPost] = useState({
    nome: "",
    endereco:"",
    corMarca: "",
    contacto:"",
    setor:"",
    valor:"",
    rating:"",
    descricao:""
  });
  
  const handleInput = (event: any) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const handleFile = (event: any) =>{
    setFile(event.target.files[0])
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(file)
    console.log(post);

    // try {
    //   const response = await axios.post("http://localhost:8080/api/users/auth", post);
    //   // After receiving the token from the server
    //     localStorage.setItem('token', response.data);


    //   router.push('/allCompany');
    // } catch (err) {
    //   setError("Dados incorretos"); // Set the error message
    // }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="file">Imagem:</label>
      <input type="file" className={styles.input}  name="file" id="file" onChange={handleFile}/>

 
      <label className={styles.label} htmlFor="nome">Nome da Empresa:</label>
      <input type="text" className={styles.input} placeholder="Entre com o nome da empresa" name="nome" id="nome" onChange={handleInput}/>

      <label className={styles.label} htmlFor="pais">País:</label>
      <select className={styles.select} onChange={handleInput} id="pais" name="pais">
        <option value="option1" disabled>Selecione o país</option>
        <option value="option2">Mozambique</option>
        <option value="option3">Brazil</option>
      </select>

      <label className={styles.label} htmlFor="endereco">Endereço:</label>
      <input type="text" className={styles.input} placeholder="Entre com o endereço" name="endereco" id="endereco" onChange={handleInput}/>
     

      <label className={styles.label} htmlFor="corMarca">Cor da Marca:</label>
      <input type="text" className={styles.input} placeholder="Entre com a cor da marca"onChange={handleInput} id="corMarca" name="corMarca" />

      <label className={styles.label} htmlFor="contacto">Contacto:</label>
      <input type="text" className={styles.input} placeholder="Entre com o contacto" id="contacto" name="contacto" onChange={handleInput}/>

      <label className={styles.label} htmlFor="setor">Setor:</label>
      <input type="text" className={styles.input} placeholder="Entre com o nome do sector" id="setor" name="setor" onChange={handleInput} />

      <label className={styles.label} htmlFor="valor">Valor:</label>
      <input type="text" className={styles.input} placeholder="Digite o valor da empresa" id="valor" name="valor" onChange={handleInput} />

      <label className={styles.label} htmlFor="rating">Rating:</label>
      <input type="text" className={styles.input} placeholder="Digite o rating da empresa" id="rating" name="rating" onChange={handleInput}/>

      <label className={styles.label} htmlFor="descricao">Descrição:</label>
      <textarea className={styles.textarea} name="descricao" id="descricao"onChange={handleInput}></textarea>
      
      <button className={styles.button} type="submit">
          Entrar
        </button>

    </form>
  );
}
