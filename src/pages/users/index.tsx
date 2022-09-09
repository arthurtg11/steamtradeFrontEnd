import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Text,
  useBreakpointValue,
  Spinner,
  Link,
  useForceUpdate,
} from "@chakra-ui/react";
import { RiAddLine, RiFolderDownloadLine, RiPencilLine, RiRepeat2Line } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import NextLink from "next/link";
import { useUsers } from "../../services/hooks/useUsers";
import { useState, useEffect } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";

export default function UserList() {
  const [value, setValue] = useState<number>(7);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error, refetch } = useUsers(page);
  console.log(data);
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  
  useEffect(() => {
    refetch();
  }, [value,refetch]);


  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`users/${userId}`);
        console.log(response);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10,
      }
    );
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuarios{" "}
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <Box>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                pr="1"
                mr="1"
                colorScheme="transparent"
                cursor="pointer"
                onClick={() => setValue(prevValue => prevValue + 1 )}
                _hover={{ bg: 'transparent', color:"pink" }}
                leftIcon={<Icon as={RiRepeat2Line} />}
              />
              <NextLink href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} />}
                >
                  Criar novo
                </Button>
              </NextLink>
            </Box>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink"/>
                    </Th>
                    <Th>Usuários</Th>
                    {isWideVersion && <Th>Data de Cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.alunos.map((user) => {
                    return (
                      <Tr key={user.alnCod}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink"  />
                        </Td>
                        <Td>
                          <Box>
                            <Link
                              color="purple.400"
                              onMouseEnter={() =>
                                handlePrefetchUser(Number(user.alnCod))
                              }
                            >
                              <Text fontWeight="bold">{user.alnName}</Text>
                            </Link>
                            <Text fontSize="small" color="gray.300">
                              {user.alnEmail}
                            </Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.alnDtaRegister}</Td>}
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            {isWideVersion && "Editar"}
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={10}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
