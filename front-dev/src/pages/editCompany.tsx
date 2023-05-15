import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/CompanyForm.module.css';
import style from '../styles/Form.module.css';
import { HeaderAll } from '@/components/HeaderAll';
import { useRouter } from 'next/router';

const EditCompany = () => {
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState<null | Array<any>>([]);
  const [resposta, setResposta] = useState<any>(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [tonkens, setTonkes] = useState<string | null>(null);
  const router = useRouter();
  const {id,nome, valor, descricao, rating,contacto,corMarca,setor, pais, cidade, bairro, rua} = router.query;

  useEffect(() => {
    const token = localStorage.getItem('token');
    setTonkes(token);
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/countries')
      .then((response) => setCountry(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const [post, setPost] = useState({
    nome: nome,
    corMarca: corMarca,
    rating: rating,
    contacto: contacto,
    setor: setor,
    valor: valor,
    descricao: descricao,
    cidade: cidade,
    bairro: bairro,
    rua: rua,
    pais: pais,
  });

  const handleFile = (event: any) => {
    if (event.target.name === 'valor') {
      const parsedValue = parseInt(event.target.value);
      setPost({ ...post, [event.target.name]: parsedValue });
    } else {
      setPost({ ...post, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/companies/${id}`,
        post,
        {
          headers: {
            Authorization: `Bearer ${tonkens}`,
          },
        }
      );
      setResposta(response.data);
      setShowDeleteMessage(true); // Exibir a mensagem temporariamente
      setTimeout(() => setShowDeleteMessage(false), 3000); // Ocultar a mensagem após 3 segundos
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      <HeaderAll />
      {/* Exibe a mensagem temporariamente */}
      {showDeleteMessage && 
        <div className={style.successMsg}>
          <FontAwesomeIcon icon={faCheck} />
          {resposta?.msg}
        </div>
      }
  
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          {step === 1 && (
            <div className={styles.main}>
              <div className={styles.heading}>
                <h3>Editar Empresa</h3>  
              </div>
              
              <div className={styles.inputText}>
                <input type="text" className={styles.input} placeholder="Nome da Empresa" name="nome" value={post.nome} onChange={handleFile} />
              </div>
  
              <div className={styles.inputText}>
                <select name="pais" className={styles.select} onChange={handleFile}>
                  <option disabled selected hidden>{pais}</option>
                  {country?.map(item => (
                    <option value={item.nome} key={item.id}>{item.nome}</option>
                  ))}
                </select>
              </div>
  
              <div className={styles.inputText}>
                <input type="text" className={styles.input} name='cidade' value={post.cidade} onChange={handleFile} />
                <input type="text" className={styles.input}  name='bairro' value={post.bairro} onChange={handleFile} />
                <input type="text" className={styles.input}  name='rua' value={post.rua} onChange={handleFile} />
              </div>
  
              <div className={styles.inputText}>
                <input type="text" className={styles.input} placeholder="Cor da Marca" name='corMarca'value={post.corMarca} onChange={handleFile} />
              </div>
  
              <div className={styles.inputText}>
                <input type="number" className={styles.input} placeholder="Valor da Empresa" name='valor' value={post.valor} onChange={handleFile} />
              </div>
  
              <div className={styles.button}>
                <button className={styles.mb2} onClick={handleNextStep} type="submit">Proximo</button> 
              </div>
            </div>
          )}
  
          {step === 2 && (
            <div className={styles.main}>
              <div className={styles.heading}>
                <h3>Cadastro de Empresa</h3>  
              </div>
              
              <div className={styles.inputText}>
                <input type="text" className={styles.input} placeholder="Contacto" name="contacto" value={post.contacto} onChange={handleFile} />
              </div>
  
              <div className={styles.inputText}>
                <input type="text" className={styles.input} placeholder="Rating" name='rating' value={post.rating} onChange={handleFile} />
              </div>
  
              <div className={styles.inputText}>
                <input type="text" className={styles.input} placeholder="Setor" name='setor' value={post.setor} onChange={handleFile} />
              </div>
  
              <div className={styles.inputText}>
                <textarea className={styles.input} placeholder="Descrição" name='descricao' value={post.descricao} onChange={handleFile}></textarea>
              </div>
  
              <div className={styles.button}>
                <button className={styles.mb20} onClick={handlePreviousStep} type="submit">voltar</button> 
                <button className={styles.mb20} type="submit">Enviar</button> 
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
  
};

export default EditCompany;
