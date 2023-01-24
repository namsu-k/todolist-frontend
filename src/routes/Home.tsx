import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { getTodos } from "../api";
import Todo from "../components/Todo";
import TodoSkeleton from "../components/TodoSkeleton";

interface ITodo {
  pk: number;
  title: string;
  done: boolean;
  deadline: string;
  is_owner: boolean;
}

export default function Home() {
  const { isLoading, data } = useQuery<ITodo[]>(["todos"], getTodos);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box w="100%">
      {isLoading ? (
        <>
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
          <TodoSkeleton />
        </>
      ) : null}
      {data?.map((todo) => (
        <Todo
          key={todo.pk}
          pk={todo.pk}
          title={todo.title}
          done={todo.done}
          deadline={todo.deadline}
        />
      ))}
      <HStack mt={4} justifyContent={"center"}>
        <Button onClick={onOpen}>
          <FaPlus />
        </Button>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New To do</ModalHeader>
          <ModalCloseButton size={"lg"} />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input placeholder="할 일을 입력하세요" />
              <FormHelperText> * 필수 항목입니다</FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Deadline</FormLabel>
              <HStack>
                <NumberInput min={2023} max={2025}>
                  <NumberInputField placeholder="년" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <NumberInput min={1} max={12}>
                  <NumberInputField placeholder="월" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <NumberInput min={1} max={31}>
                  <NumberInputField placeholder="일" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <NumberInput min={0} max={23}>
                  <NumberInputField placeholder="시" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <NumberInput min={0} max={59}>
                  <NumberInputField placeholder="분" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
