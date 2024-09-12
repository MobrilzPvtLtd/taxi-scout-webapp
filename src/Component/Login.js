import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Checkbox,
  Link,
  Image,
  Flex
} from '@chakra-ui/react';


const Login = () => {

  const [credentials, setCredentials] = useState({mobile: "", password: ""}) 
  let history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://admin.taxiscout24.com/api/v1/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    }); 
    
    const json = await response.json()
    console.log(json);
    if (json){
      // Save the auth token and redirect
      sessionStorage.setItem('token', json.authtoken); 
      Navigate("/home");

  }
  else{
      alert("Invalid credentials");
  }
  }
  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})}   
  return (
    <Stack minH="100vh" direction={{ base: 'column-reverse', md: 'row' }}>
      <Flex flex={1}>
        <Image alt="Cover image" objectFit="cover" src="https://bit.ly/2k1H1t6" />
      </Flex>
      <Flex p={8} flex={1} align="center" justifyContent="center">
        <Stack spacing={4}>
          <Stack align="center">
            <Heading fontSize="2xl">Sign in to your account</Heading>
          </Stack>
          <VStack
            as="form"
            spacing={8}
            boxSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            h="max-content !important"
            bg={useColorModeValue('white', 'gray.700')}
            rounded="lg"
            boxShadow="lg"
            p={{ base: 5, sm: 10 }}
          >
            <VStack spacing={4} w="100%">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input rounded="md" type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input rounded="md" type="password" />
              </FormControl>
            </VStack>
            <VStack w="100%">
              <Stack direction="row" justifyContent="space-between" w="100%">
                <Checkbox colorScheme="green" size="md">
                  Remember me
                </Checkbox>
                <Link fontSize={{ base: 'md', sm: 'md' }}>Forgot password?</Link>
              </Stack>
              <Button
                bg="green.300"
                color="white"
                _hover={{
                  bg: 'green.500'
                }}
                rounded="md"
                w="100%"
              >
                Sign in
              </Button>
            </VStack>
          </VStack>
        </Stack>
      </Flex>
    </Stack>
  )
}

export default Login
