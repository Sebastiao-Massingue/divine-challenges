import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import axios from 'axios';
import { error } from 'console';
import { use, useEffect, useState } from 'react';
import { faCheck} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Form.module.css"
import { useRouter } from 'next/router';
import React from 'react';


export default function SearchBar({onData}: {onData: Function}): JSX.Element {
  const theme = useMantineTheme();
  const [csv, setCsv] = useState<any>(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [searchbar, setSearchbar] = useState<any>({})

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  
  };

  const fetchData = () => {
    axios
      .get(`https://companies-u6b0.onrender.com/api/companies/name/${inputValue}`)
      .then((response) => onData(response.data))
      .catch((error) => console.log(error));
  };
  
  useEffect(() => {
    if (inputValue !== '') {
      fetchData();
    }
  }, [inputValue]);



  // Criar arquivo csv
  const CSV = async () => {
    axios
      .get(`http://companies-u6b0.onrender.com/api/companies/create/csv`)
      .then((response) => {
        setCsv(response.data);
        setShowDeleteMessage(true); // Exibir a mensagem temporariamente
        setTimeout(() => setShowDeleteMessage(false), 3000);
      })
      .catch((error) => console.log("Fallha"));
  };

  return (
    <>
      {/* Exibe a mensagem temporariamente */}
      {showDeleteMessage && <div className={styles.successMsg}><FontAwesomeIcon icon={faCheck} />{csv?.msg} </div>}

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom:'20px'}}>
        <Button onClick={() => router.push('/setEmpresa')} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} style={{marginLeft:"40px"}}>
          Cadastrar
        </Button>

        <TextInput
          icon={<IconSearch size="1.1rem" stroke={1.5} />}
          radius="xl"
          size="md"
          rightSection={
            <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
              {theme.dir === 'ltr' ? (
                <IconArrowRight size="1.1rem" stroke={1.5} />
              ) : (
                <IconArrowLeft size="1.1rem" stroke={1.5} />
              )}
            </ActionIcon>
          }
          placeholder="Search questions"
          rightSectionWidth={42}
          style={{ width: '800px', margin: '0 auto' }} // Center horizontally
         
          value={inputValue}
          onChange={handleInputChange}
        />

        <Button onClick={() => CSV()} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
         style={{marginRight:"40px"}}>
          Criar arquivo CSV
        </Button>
</div>
</>
);
}
