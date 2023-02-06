import { Button, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaRunning } from "react-icons/fa";

import { useParams } from "react-router-dom";
import { getTodo } from "../api";

interface IUser {
  username: string;
  name: string;
  email: string;
}

interface ITodoDetail {
  pk: number;
  user: IUser;
  created_at: string;
  updated_at: string;
  title: string;
  done: boolean;
}

export default function TodoDetail() {
  const { todoPk } = useParams();
  const { isLoading, data } = useQuery<ITodoDetail>([`todo`, todoPk], getTodo);
  console.log(data);
  return (
    <Flex wrap={"wrap"} justifyContent={"center"} w="100%">
      <VStack
        h="80vh"
        w="70%"
        mt={4}
        borderWidth={1}
        borderRadius={"2xl"}
        bgColor={"blackAlpha.500"}
        gap={4}
      >
        <VStack alignItems={"flex-start"} justifyContent={"center"} h="50%">
          <Text color={"cornsilk"}>제목</Text>
          <Heading>{data?.title}</Heading>
        </VStack>

        <HStack alignItems={"center"} justifyContent={"center"} h="15%">
          <Text color={"cornsilk"}>완료 여부</Text>
          <Button h="70%" w="100%">
            {data?.done ? <FaCheck size={"70%"} /> : <FaRunning size={"70%"} />}
          </Button>
        </HStack>

        <VStack alignItems={"flex-start"}>
          <Text color={"cornsilk"}>생성일</Text>
          <Text as="b">
            {data?.created_at.split("T")[0]}{" "}
            {data?.created_at.split("T")[1].slice(0, 8)}
          </Text>

          <Text color={"cornsilk"}>수정일</Text>
          <Text as="b">
            {data?.updated_at.split("T")[0]}{" "}
            {data?.updated_at.split("T")[1].slice(0, 8)}
          </Text>
        </VStack>

        <VStack alignItems={"flex-start"}>
          <Text color={"cornsilk"}>유저 정보</Text>
        </VStack>
      </VStack>
    </Flex>
  );
}
