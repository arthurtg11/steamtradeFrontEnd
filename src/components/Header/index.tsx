import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri';
import { UseSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { Logo } from './Logo';
import { NotificationNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';

export function Header() {
    const { onOpen } = UseSidebarDrawer();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: false, 
        xl: true

    })

    return (
        <Flex
            as="header"
            w="100%"
            maxWidth={1680}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
        >

            { !isWideVersion && (
                <IconButton 
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenuLine}/>}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                >

                </IconButton>
            )}

            <Logo />


            {isWideVersion && <SearchBox />}


            <Flex
                align="center"
                ml="auto"
            >
                <NotificationNav />
                <Profile showProfileData={isWideVersion} />
            </Flex>

        </Flex >
    );
}