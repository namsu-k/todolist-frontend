import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaMoon, FaPlus, FaSun, FaTasks } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useQueryClient } from "@tanstack/react-query";
import AddTodo from "./AddTodo";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("blue.500", "blue.200");
  const ColorIcon = useColorModeValue(FaMoon, FaSun);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();
  const onLogOut = async () => {
    const toastId = toast({
      title: "Login Out",
      description: "See you later",
      status: "loading",
    });
    await logOut();
    queryClient.refetchQueries(["me"]);
    toast.update(toastId, {
      status: "success",
      title: "Done",
      description: "See you later",
    });
  };
  return (
    <HStack justifyContent={"space-between"} borderBottomWidth={1}>
      <Box p={2} color={logoColor}>
        <Link to={"/"}>
          <FaTasks size={"36px"} />
        </Link>
      </Box>
      <HStack p={2} spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<ColorIcon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <Button onClick={onSignUpOpen} colorScheme={"blue"}>
                Sign up
              </Button>
            </>
          ) : (
            <>
              <IconButton
                aria-label="할 일 추가하기"
                icon={<FaPlus />}
                w="40px"
                h="40px"
                variant={"ghost"}
                onClick={onOpen}
              />
              <Menu>
                <MenuButton>
                  <Avatar name={user?.name} size={"sm"} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={onLogOut}>Log out</MenuItem>
                </MenuList>
              </Menu>
            </>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
      <AddTodo isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
}
