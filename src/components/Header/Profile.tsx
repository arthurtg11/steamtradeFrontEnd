import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex>
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Arthur Turini</Text>
                    <Text color="gray.300" fontSize="small">
                        arthurtgam@gmail.com
                    </Text>
                </Box>
            )}

            <Avatar size="md" name="Arthur Turini" />
        </Flex>
    )
}