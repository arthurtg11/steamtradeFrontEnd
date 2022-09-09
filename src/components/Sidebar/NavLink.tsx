import { Box, Text, Link as ChakraLink, Icon, LinkProps as ChackraLinkProps } from '@chakra-ui/react'
import { ElementType } from 'react';
import Link from 'next/link'
import { ActiveLink } from '../ActiveLink';

interface NavLinkProps extends ChackraLinkProps {
    icon: ElementType;
    children: string;
    href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
    return (
        <ActiveLink href={href} passHref>
            <ChakraLink display="flex" align="center" {...rest}>
                <Icon as={icon} fontSize="20" />
                <Text ml="4" fontWeight="medium">{children}</Text>
            </ChakraLink>
        </ActiveLink>
    );
}