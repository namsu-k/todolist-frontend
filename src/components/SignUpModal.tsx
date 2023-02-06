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
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ISignUpVariable, signUp } from "../api";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ISignUpForm {
  username: string;
  password: string;
  name: string;
  email: string;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISignUpForm>();
  const toast = useToast();
  const mutation = useMutation(signUp, {
    onSuccess: () => {
      toast({
        title: "Sign Up Complete",
        status: "success",
      });
      reset();
      onClose();
    },
  });
  const onSubmit = ({ username, password, name, email }: ISignUpVariable) => {
    mutation.mutate({ username, password, name, email });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody mb={4} as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack mb={4}>
            <Input
              isInvalid={Boolean(errors.username?.message)}
              placeholder={"Username"}
              {...register("username", { required: "require username" })}
            />
            {errors ? (
              <Text color={"red.300"}>{errors.username?.message}</Text>
            ) : null}

            <Input
              isInvalid={Boolean(errors.password?.message)}
              type={"password"}
              placeholder={"Password"}
              {...register("password", { required: "require password" })}
            />
            {errors ? (
              <Text color={"red.300"}>{errors.password?.message}</Text>
            ) : null}
            <Input placeholder="Name" {...register("name")} />
            <Input placeholder="Email" {...register("email")} />
          </VStack>
          <Button w="100%" type="submit" colorScheme={"blue"}>
            Sign Up
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
