import {
  Button,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaCheck, FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ITodo } from "../routes/Home";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putTodo } from "../api";

export default function Todo({
  id,
  done,
  title,
  created_at,
  updated_at,
  user,
}: ITodo) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation(putTodo, {
    onSuccess: () => {
      if (done) {
        toast({
          title: "Done",
          status: "success",
          description: "Good Job",
          duration: 1500,
        });
      } else {
        toast({
          title: "Change Done State",
          status: "warning",
          description: "You Can Do It",
          duration: 1500,
        });
      }
      queryClient.refetchQueries(["todos"]);
    },
  });
  const onClick = () => {
    done ? (done = false) : (done = true);
    mutation.mutate({ id, done });
  };
  return (
    <HStack
      h="100px"
      w="70%"
      mt={4}
      borderWidth={1}
      borderRadius={"2xl"}
      bgColor={"blackAlpha.500"}
    >
      <Button h="40px" w="40px" onClick={onClick}>
        {done ? <FaCheck /> : null}
      </Button>
      <VStack w="100%">
        <Heading noOfLines={1}>{title}</Heading>
        <VStack w="60%" spacing={-1} alignItems="flex-end">
          <Text as={"i"} fontSize={"xs"} colorScheme="gray">
            {created_at.split("T")[0]} {created_at.split("T")[1].slice(0, 5)}{" "}
            추가됨
          </Text>
          <Text as={"i"} fontSize={"xs"} colorScheme="gray">
            {updated_at.split("T")[0]} {updated_at.split("T")[1].slice(0, 5)}{" "}
            수정됨
          </Text>
        </VStack>
      </VStack>
      <Link to={`todo/${id}`}>
        <Button h="40px" w="40px">
          <FaEllipsisV />
        </Button>
      </Link>
    </HStack>
  );
}
