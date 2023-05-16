import { Card, Image, Text, Badge, Button, Group, Grid } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { HeaderAll } from '@/components/HeaderAll';
import { FooterLinks } from '@/components/Footer';
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Form.module.css";
import { useRouter } from 'next/router';
import SeacherBar from '@/components/SearchBar';

export default function Demo() {
  
  //Variables
  const [data, setData] = useState<null | Array<any>>(null);
  const [deletes, setDeletes] = useState<any>(null);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8; // Total number of pages
  const router = useRouter();
  
  
  const [tonkens, setTonkes] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setTonkes(token);
  }, []);

  //Get company by number of page
  useEffect(() => {
    axios
      .get(`https://companies-u6b0.onrender.com/api/companies/items/${currentPage}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [currentPage]);

  //Next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  //Prev page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  //Delete company
  function deleteCompany(idcamp: any) {
    axios
      .delete(`https://companies-u6b0.onrender.com/api/companies/${idcamp}`, {
        headers: {
          Authorization: `Bearer ${tonkens}`,
        },
      })
      .then((response) => {
        setDeletes(response.data);
        setShowDeleteMessage(true); // Exibir a mensagem temporariamente
        setTimeout(() => setShowDeleteMessage(false), 3000); // Ocultar a mensagem após 3 segundos
      })
      .catch((error) => console.log(error));
  }

  //Data to be pass in footer
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

  const handleDataFromChild = (data:any) => {
    // Do something with the data received from the child
    setData(data);
  };
  return (
    <>
      {/* Exibe a mensagem temporariamente */}
      {showDeleteMessage && (
        <div className={styles.successMsg}>
          <FontAwesomeIcon icon={faCheck} />
          {deletes?.msg}
        </div>
      )}
  
      <HeaderAll />
      <SeacherBar onData={handleDataFromChild} />
  
      <Grid>
        {data?.map((d, i) => (
          <Grid.Col sm={12} md={3} lg={3} key={i}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section component="a" href="/companyDetails">
                <Image src="images/camp3.jpg" height={140} alt="Norway" />
              </Card.Section>
  
              <Group position="apart" mt="md" mb="xs">
                <Text>
                  <strong>{d.nome.split(' ')[0]}</strong> - {d.pais.nome}
                </Text>
              </Group>
  
              <Text size="sm" color="dimmed">
                {d.descricao.length > 75 ? `${d.descricao.substring(0, 75)}...` : d.descricao}
              </Text>
              <Text size="sm" color="dimmed">
                <div className={styles.iconSpace}>
                  <Link href={`/editCompany?id=${d.id}`}> {/*Redirecting to page editCompany*/}
                    <FontAwesomeIcon icon={faPen} />
                  </Link>
                  <Link href="" onClick={() => deleteCompany(d.id)}> {/*Calling function delete*/}
                    <FontAwesomeIcon icon={faTrash} />
                  </Link>
                </div>
              </Text>
  
              <Button 
                onClick={() => router.push(`/companyDetails?id=${d.id}`)} 
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Ver mais detalhes
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
  
      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-5">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <Link className="page-link" onClick={handlePreviousPage} href="#">
              Voltar
            </Link>
          </li>
  
          {[...Array(totalPages)].map((_, index) => (
            <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
              <Link className="page-link" onClick={() => setCurrentPage(index + 1)} href="#">
                {index + 1}
              </Link>
            </li>
          ))}
  
          <li className="page-item">
            <Link className="page-link" onClick={handleNextPage} href="#">
              Proximo
            </Link>
          </li>
        </ul>
      </nav>
  
      <FooterLinks data={foot} />
    </>
  );
  
}
