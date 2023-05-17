import { FooterLinks } from '@/components/Footer';
import { HeaderMegaMenu } from '@/components/Header';
import { HeaderAll } from '@/components/HeaderAll';
import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    rem,
  } from '@mantine/core';
  import { IconCheck } from '@tabler/icons-react';
import axios from 'axios';
  import image from 'next/image';
  
  const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: `calc(${theme.spacing.xl} * 4)`,
      paddingBottom: `calc(${theme.spacing.xl} * 4)`,
    },
  
    content: {
      maxWidth: rem(480),
      marginRight: `calc(${theme.spacing.xl} * 3)`,
  
      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: rem(44),
      lineHeight: 1.2,
      fontWeight: 900,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: rem(28),
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        flex: 1,
      },
    },
  
    image: {
      flex: 1,
  
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },
  
    highlight: {
      position: 'relative',
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      borderRadius: theme.radius.sm,
      padding: `${rem(4)} ${rem(12)}`,
    },
  }));
  
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


  export default function HeroBullets() {

    const { classes } = useStyles();
    const router = useRouter();
    const { id } = router.query;
    const [data, setDatas] = useState<any>({});

  useEffect(() => {
    axios.get(`https://companies-u6b0.onrender.com/api/companies/${id}`)
      .then(response => setDatas(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const foot=[
 
    {
      title: 'Empresa',
      links: [
        { label: 'Página Inicial', link: '/' },
       
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Empresa', link: '/allCompany' },
       
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
        { label: 'Contactos', link: '/contact' },
       
      ],
    },
  ]
  
  
    
    return (
      <div>
        <HeaderAll/>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              
              <Title className={classes.title}>
                Detalhes da Empresa
              </Title>
      
  
              <List
                mt={30}
                spacing="xm"
                size="md"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCheck size={rem(12)} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>Nome da Empresa</b> - {data.nome}
                </List.Item>
                <List.Item>
                
                  {data?.fundadores?.map((fundador:any, index: any) => (
                  <p style={{margin:"0px"}} key={index}><b>Fundador - </b>{fundador.user?.name}</p>))}
                 
                </List.Item>
                <List.Item>
                  <b>País</b> – {data?.pais?.nome}
                </List.Item>
                <List.Item>
                  <b>Contacto</b> – {data.contacto}
                </List.Item>
                <List.Item>
                  <b>Cor da Marca</b> – {data.corMarca}
                </List.Item>
                <List.Item>
                  <b>Valor</b> – MZN {data.valor}
                </List.Item>
                <List.Item>
                  <b>Rating</b> – {data.rating}
                </List.Item>
                <List.Item>
                  <b>Setor</b> – {data.setor}
                </List.Item>
                <List.Item>
                  <b>Descrição:</b> – {data.descricao}
                </List.Item>
              </List>

            </div>
            <Image src="/images/camp2.jpg" className={classes.image}  />
          {/* <image src={"images/camp3.jpg"} alt="Imagem 1" className={classes.image} /> */}

          </div>
        </Container>
        <FooterLinks data={foot} />
      </div>
    );
  }