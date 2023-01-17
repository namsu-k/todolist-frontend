import { Box, Button, VStack } from "@chakra-ui/react";
import { FaGithub, FaGoogle, FaComment } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <Box my={4}>
      <VStack>
        <Button leftIcon={<FaGithub />} w="100%">
          Login with Github
        </Button>
        <Button leftIcon={<FaGoogle />} w="100%">
          Login with Google
        </Button>
        <Button leftIcon={<FaComment />} w="100%" colorScheme={"yellow"}>
          Login with Kakao
        </Button>
      </VStack>
    </Box>
  );
}
