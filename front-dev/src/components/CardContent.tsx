import styles from "../styles/CardContent.module.css";
import { useRouter } from "next/router";
import { Card, Image, Text, Badge, Button, Group, Grid } from '@mantine/core';
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

const Cards = () => {
  let cards = [];
  const router = useRouter();

  const [data, setData] = useState<null | Array<any>>(null); // Provide type annotation
  const [loading, setLoading] = useState(false); // New state variable for loading


  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
        const response = await axios.get('https://companies-u6b0.onrender.com/api/companies/top/five');
        setData(response.data);
        setLoading(false); // Hide the loading spinner after data is fetched

    };

    fetchData();

  }, []);  

  return (
    <>
      <h1 className={styles.cardTitulo}>Essas são as Empresas mais valiosas da <i>TechServices</i></h1>

        {loading ? (
          <div className={styles.loadingcontainer}>
          <div className={styles.loadingspinner} />
        </div>
      ) : (<Grid>
        
          {data && data.map(item => (

            <Grid.Col xs={12} sm={12} md={3} lg={3} xl={3} key={item.id}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section component="a" href="/companyDetails">
                  <Image
                    src="images/camp2.jpg"
                    height={140}
                    alt="Norway"
                  />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                  <Text > <strong>{item.nome.split(' ')[0]}</strong> - {item.pais.nome}</Text>
                </Group>

                <Text size="sm" color="dimmed">
                {item.descricao.length > 75 ? `${item.descricao.substring(0, 75)}...` : item.descricao}
              </Text>

              <Button onClick={()=>router.push(`/companyDetails?id=${item.id}`)}variant="light" color="blue" fullWidth mt="md" radius="md">
                  Ver mais detalhes
                </Button>
              </Card>
            </Grid.Col>
            
          ))}
        
      </Grid>
       )}
    </>
  );
};

export default Cards;
