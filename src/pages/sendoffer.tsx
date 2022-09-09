import {
  Flex,
  SimpleGrid,
  Box,
  Text,
  theme,
  Divider,
  Image,
  Button,
  Icon,
  Input,
  FormHelperText,
  FormControl,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import IntlCurrencyInput from "react-intl-currency-input";
import Helmet from 'react-helmet'

import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { findInventoryUserById } from "../services/hooks/useItens";

export default function Dashboard() {
  const [yInventory, setYInventory] = useState(1);
  //https://github.com/thiagozanetti/react-intl-currency-input
  const [value, setValue] = useState(0);

  const [inventory, setInventory] = useState({});

  const handleChange = (event, value, maskedValue) => {
    event.preventDefault();
    setValue(value)
    //console.log(value); // value without mask (ex: 1234.56)
    //console.log(maskedValue); // masked value (ex: R$1234,56)
  };
  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: false,
    xl: true,
  });
  
  return (
    
    <Flex direction="column" h="100vh">
      <Helmet title="Enviar propostas de troca" />
      <Header />
      <Flex w="100%" my="6" maxWidth={1680} minHeight={950} mx="auto" px="6">
        <Sidebar />
        <SimpleGrid w="1050px" minChildWidth="500px" justifyItems="center">
          <SimpleGrid
            gap="4"
            minChildWidth="500px"
            w="500px"
            display="flex"
            height={600}
          >
            <Box
              bg="#1D1D1D"
              width={500}
              borderRadius={2}
              flex="1"
              align="flex"
              border="1px solid #494949"
            >
              <SimpleGrid
                borderRadius={1}
                flex="1"
                align="flex-start"
                minChildWidth={100}
              >
                <Box
                  bg="#1D1D1D"
                  borderRadius={1}
                  height="16"
                  display="flex"
                  textAlign="center"
                  pl="8"
                  cursor="pointer"
                  bgGradient={
                    yInventory
                      ? "linear( to bottom, #34445D 5%, #1D1D1D 95%)"
                      : "linear-gradient( to bottom, #4E4E4E 5%, #1D1D1D 95%)"
                  }
                  onClick={() => setYInventory(1)}
                  borderRight="1px solid #494949"
                  borderBottom={yInventory ? "none" : "1px solid #494949"}
                >
                  <Text
                    alignSelf="center"
                    fontSize={20}
                    fontFamily="Motiva Sans, Sans-serif"
                    fontWeight="200"
                  >
                    Seu Inventário
                  </Text>
                </Box>
                <Box
                  bg="#1D1D1D"
                  borderRadius={1}
                  height="16"
                  display="flex"
                  textAlign="center"
                  cursor="pointer"
                  pl="8"
                  bgGradient={
                    !yInventory
                      ? "linear( to bottom, #34445D 5%, #1D1D1D 95%)"
                      : "linear-gradient( to bottom, #4E4E4E 5%, #1D1D1D 95%)"
                  }
                  onClick={() => setYInventory(0)}
                  borderLeft="1px solid #494949"
                  borderBottom={!yInventory ? "none" : "1px solid #494949"}
                >
                  <Text
                    alignSelf="center"
                    fontSize={20}
                    fontFamily="Motiva Sans, Sans-serif"
                    fontWeight="200"
                  >
                    Invetário dele(a)
                  </Text>
                </Box>
              </SimpleGrid>
              <SimpleGrid
                spacing={1.5}
                minChildWidth="90px"
                bgColor="#000000"
                p="1"
                m="5"
                mb="0"
                fontFamily="sans-serif"
              >
                <Box
                  maxWidth={450}
                  border="1px solid white"
                  bgColor="#292929"
                  height="24"
                  cursor="grab"
                  _hover={{
                    backgroundColor: "#3D4450",
                  }}
                >
                  <Image src="https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU4naLOJzgUuYqyzIaIxa6jMOLXxGkHvcMjibmU99Sg3Qaw-hA_ZWrzLISLMlhpgJJUhGE/96fx96f" />
                </Box>
                <Box
                  maxWidth={450}
                  border="1px solid #4b2d60"
                  bgColor="#292929"
                  height="24"
                  cursor="grab"
                  _hover={{
                    backgroundColor: "#3D4450",
                  }}
                >
                  <Image src="https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zbfgJM5du-gL-GkvP9JrafkDxV7pF02-zFodzzilfkqBA4Mmj2dYHHdAQ-ZF3Z_Va5yersh5S67oOJlyU2RlEtTw/96fx96f" />
                </Box>
                <Box
                  maxWidth={450}
                  border="1px solid #CF6A32"
                  bgColor="#292929"
                  height="24"
                  cursor="grab"
                  _hover={{
                    backgroundColor: "#3D4450",
                  }}
                >
                  <Image src="https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU4naLOJzgUuYqyzIaIxa6jMOLXxGkHvcMjibmU99Sg3Qaw-hA_ZWrzLISLMlhpgJJUhGE/96fx96f" />
                </Box>
                <Box
                  maxWidth={450}
                  border="1px solid white"
                  bgColor="#292929"
                  height="24"
                  cursor="grab"
                  _hover={{
                    backgroundColor: "#3D4450",
                  }}
                >
                  <Image src="https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU4naLOJzgUuYqyzIaIxa6jMOLXxGkHvcMjibmU99Sg3Qaw-hA_ZWrzLISLMlhpgJJUhGE/96fx96f" />
                </Box>
                <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                <Box maxWidth={450} bgColor="#292929" height="24"></Box>
              </SimpleGrid>
              <Button onClick={findInventoryUserById}>abccc</Button>
              <Box justifyContent="space-between" display="flex">
                <Text p="1" ml="5" mt="1">
                  Exibindo somente itens trocáveis
                </Text>
                <Box display="flex" mt="2" mr="5">
                  <Button
                    borderRadius={4}
                    bgColor="rgba( 103, 193, 245, 0.2 )"
                    color="#66c0f4"
                    opacity="0.2"
                    maxHeight="6"
                    maxWidth="8xl"
                  >
                    <Icon as={MdKeyboardArrowLeft} />
                  </Button>
                  <Text marginX="5">1 de 5</Text>
                  <Button
                    borderRadius={4}
                    bgColor="rgba( 103, 193, 245, 0.2 )"
                    color="#66c0f4"
                    maxHeight="6"
                    maxWidth="8xl"
                  >
                    <Icon as={MdKeyboardArrowRight} />
                  </Button>
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
          <SimpleGrid
            gap="4"
            minChildWidth="500px"
            w="500px"
            display="flex"
            height={900}
          >
            <Box
              bg="#1D1D1D"
              width={500}
              borderRadius={2}
              flex="1"
              align="flex"
              minChildWidth={100}
              gap="6"
              border="1px solid #494949"
            >
              <Box mb="5">
                <Box
                  bg="#1D1D1D"
                  borderRadius={1}
                  height="16"
                  display="flex"
                  textAlign="center"
                  pl="8"
                  cursor="pointer"
                  bgGradient={
                    yInventory
                      ? "linear( to bottom, #34445D 5%, #1D1D1D 95%)"
                      : "linear-gradient( to bottom, #4E4E4E 5%, #1D1D1D 95%)"
                  }
                  onClick={() => setYInventory(1)}
                  borderRight="1px solid #494949"
                  pt="4"
                >
                  <Image
                    alignSelf="center"
                    src="https://avatars.cloudflare.steamstatic.com/f770f7d7cbc04e9c8b742b3ce6fbca2eca62a4c8.jpg"
                    w="10"
                    h="10"
                    mr="4"
                  />
                  <Text
                    color="#B8BCBF"
                    alignSelf="center"
                    fontSize={20}
                    fontFamily="Motiva Sans, Sans-serif"
                    fontWeight="200"
                  >
                    Seus Itens:
                  </Text>
                </Box>
                <SimpleGrid
                  spacing={1.5}
                  minChildWidth="90px"
                  bgColor="#000000"
                  p="1"
                  m="5"
                  mb="0"
                >
                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                </SimpleGrid>
                <Box justifyContent="space-between" display="flex">
                  <Text p="1" ml="5" mt="1"></Text>
                  <Box display="flex" mt="2" mr="5">
                    <Button
                      borderRadius={4}
                      bgColor="rgba( 103, 193, 245, 0.2 )"
                      color="#66c0f4"
                      opacity="0.2"
                      maxHeight="6"
                      maxWidth="8xl"
                    >
                      <Icon as={MdKeyboardArrowLeft} />
                    </Button>
                    <Text marginX="5">1 de 1</Text>
                    <Button
                      borderRadius={4}
                      bgColor="rgba( 103, 193, 245, 0.2 )"
                      color="#66c0f4"
                      maxHeight="6"
                      maxWidth="8xl"
                      opacity="0.2"
                    >
                      <Icon as={MdKeyboardArrowRight} />
                    </Button>
                  </Box>
                </Box>
                <FormControl
                  display="flex"
                  mt="1"
                  id="first-name"
                  isRequired
                  isInvalid
                >
                  <Box ml="10" color="#B8BCBF" mr="4">
                    <FormHelperText fontSize={10}>
                      O Valor minimo é 100 reais!
                    </FormHelperText>
                    <Box display="flex">
                      <Text mr="4">Valor a ser enviado:</Text>
                      <IntlCurrencyInput
                        currency="BRL"
                        defaultValue={0}
                        value={value}
                        config={currencyConfig}
                        onChange={handleChange}
                        style={{
                          color: "white",
                          backgroundColor: "transparent",
                        }}
                      />
                    </Box>
                  </Box>
                </FormControl>
              </Box>

              <Box display="flex" justifyContent="center" mt="0">
                <Image src="dividerTradeImg.png" />
              </Box>
              <Box mt="2">
                <Box
                  bg="#1D1D1D"
                  borderRadius={1}
                  height="16"
                  display="flex"
                  textAlign="center"
                  pl="8"
                  cursor="pointer"
                  bgGradient={
                    !yInventory
                      ? "linear( to bottom, #34445D 5%, #1D1D1D 95%)"
                      : ""
                  }
                  borderRight="1px solid #494949"
                  pt="4"
                >
                  <Image
                    alignSelf="center"
                    src="https://avatars.cloudflare.steamstatic.com/0181b3806af7654eb6d083f0106feeaabac67983.jpg"
                    w="10"
                    h="10"
                    mr="4"
                  />
                  <Text
                    color="#B8BCBF"
                    alignSelf="center"
                    fontSize={20}
                    fontFamily="Motiva Sans, Sans-serif"
                    fontWeight="200"
                  >
                    Itens de Leozin7:
                  </Text>
                </Box>

                <SimpleGrid
                  spacing={1.5}
                  minChildWidth="90px"
                  bgColor="#000000"
                  p="1"
                  m="5"
                  mb="0"
                >
                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>

                  <Box maxWidth={450} bgColor="#292929" height="24"></Box>
                </SimpleGrid>
                <Box justifyContent="space-between" display="flex">
                  <Text p="1" ml="5" mt="1"></Text>
                  <Box display="flex" mt="2" mr="5">
                    <Button
                      borderRadius={4}
                      bgColor="rgba( 103, 193, 245, 0.2 )"
                      color="#66c0f4"
                      opacity="0.2"
                      maxHeight="6"
                      maxWidth="8xl"
                    >
                      <Icon as={MdKeyboardArrowLeft} />
                    </Button>
                    <Text marginX="5">1 de 1</Text>
                    <Button
                      borderRadius={4}
                      bgColor="rgba( 103, 193, 245, 0.2 )"
                      color="#66c0f4"
                      maxHeight="6"
                      maxWidth="8xl"
                      opacity="0.2"
                    >
                      <Icon as={MdKeyboardArrowRight} />
                    </Button>
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center" mt="5">
                  <Image src="divider.png" />
                </Box>
                <Box justifyContent="center" display="flex" mt="5" >
                  <Button
                    bgGradient="linear( to bottom, #525252 5%, #343434 95%)"
                    colorScheme={"green"}
                    _hover={{ backgroundColor:"linear( to bottom, #525252 5%, #343434 95%)" }}
                    cursor="auto"
                    type="submit"
                    width="60%"
                    height={16}
                    fontFamily="Motiva Sans, Sans-serif"
                    fontWeight="200"
                    fontSize="24"
                    color="#7f7f7f">
                    Realizar Proposta
                  </Button>
                </Box>
              </Box>
            </Box>
          </SimpleGrid>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
