import Card from "@/components/CardContent";
import { FooterLinks } from "@/components/Footer";
import { HeaderMegaMenu } from "@/components/Header";
import { HeroImageBackground } from "@/components/HeroHeader";
import { NextPage } from "next";

// Dados para FooterLinks
const data=[
 
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
]


const Home: NextPage = () => {

  return ( 
  <>
    
    <HeaderMegaMenu />
    <HeroImageBackground />
    <Card />
    <FooterLinks data={data} />
  </> );
}
 
export default Home;