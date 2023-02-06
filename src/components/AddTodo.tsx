import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTodo } from "../api";

interface ITodoForm {
  title: string;
}

interface IAddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTodo({ isOpen, onClose }: IAddTodoModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITodoForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(postTodo, {
    onSuccess: () => {
      toast({
        title: "Done",
        status: "success",
      });
      onClose();
      queryClient.refetchQueries(["todos"]);
      reset();
    },
  });
  const onSubmit = ({ title }: ITodoForm) => {
    mutation.mutate({ title });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>할 일 추가하기</ModalHeader>
        <ModalCloseButton size={"lg"} />
        <ModalBody mb={4} as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack gap={4}>
            <FormControl isRequired>
              <FormLabel>제목</FormLabel>
              <Input
                {...register("title", { required: true })}
                placeholder="할 일을 입력하세요"
              />
              <FormHelperText>* 필수 항목입니다</FormHelperText>
            </FormControl>

            {/* <FormControl>
              <FormLabel>마감기한</FormLabel>
              <Input {...register("deadline")} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>설명</FormLabel>
              <Textarea
                resize={"none"}
                {...register("description")}
                placeholder="세부사항을 입력하세요"
              />
            </FormControl> */}
            <Button w="100%" type="submit" colorScheme={"blue"}>
              추가하기
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
