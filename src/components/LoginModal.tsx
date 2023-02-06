import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { usernameLogin } from "../api";
// import SocialLogin from "./SocialLogin";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(usernameLogin, {
    onSuccess: () => {
      toast({
        title: "welcome back",
        status: "success",
      });
      onClose();
      queryClient.refetchQueries(["me"]);
      reset();
    },
    onError: (errors) => {
      console.log(errors);
    },
  });
  const onSubmit = ({ username, password }: ILoginForm) => {
    mutation.mutate({ username, password });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={4} as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack mb={4}>
            <Input
              isInvalid={Boolean(errors.username?.message)}
              {...register("username", { required: "Please write a username" })}
              placeholder="Username"
            />
            <Input
              isInvalid={Boolean(errors.password?.message)}
              {...register("password", { required: "Please write a password" })}
              type={"password"}
              placeholder="Password"
            />
          </VStack>
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            w="100%"
            colorScheme={"blue"}
          >
            Log In
          </Button>
          {mutation.isError ? (
            <Text color="red.500" textAlign={"center"} fontSize="sm">
              Username or Password are wrong
            </Text>
          ) : null}
          {/* <SocialLogin /> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
