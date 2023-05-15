import { FC } from "react";
import { Navbar, Group, Space, Breadcrumbs,Anchor, Text, Button, Flex} from "@mantine/core"
import { useRouter } from "next/router";
import Link from "next/link";
const boxShadow = 'rgba(0, 0, 0, 0.04) 0px 3px 5px'

const NavBar: FC = () => {
const router = useRouter();
    return ( 
    <Navbar  sx={{boxShadow, height:56}}>
        <Navbar.Section>
            <Group position="right" >
                <Flex 
                    direction={{ base: 'column', sm: 'row' }}
                    gap={{ base: 'sm', sm: 'lg' }}
                    justify={{ sm: 'center' }}
                    
                >
                    <Space h="md" />
                    <Button variant="white" onClick={() => router.push('/')}> Home</Button>
                    <Button onClick={() => router.push('/')}> Home</Button>
                    <Button onClick={() => router.push('/')}> Home</Button>
                </Flex>
                    
            </Group>
        </Navbar.Section>
    </Navbar> );
}
 
export default NavBar;
