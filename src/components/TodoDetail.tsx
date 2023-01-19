import { Box, Button, Heading, HStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaAngleLeft, FaCheck, FaPen } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getTodo } from "../api";

interface ITodoDetail {
  pk: number;
  user: [];
  time_left: string;
  is_owner: boolean;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  deadline: string;
  done: boolean;
}

export default function TodoDetail() {
  const { todoPk } = useParams();
  const { isLoading, data } = useQuery<ITodoDetail>([`todo`, todoPk], getTodo);
  return (
    <Box my={1} mx={{ base: 8, md: "auto" }} maxW={"686px"} h={"6vh"}>
      <Button>
        <FaAngleLeft />
      </Button>

      <HStack gap={0}>
        {data?.done === true ? <FaCheck /> : null}
        <Heading>{data?.title}</Heading>
        <Button>
          <FaPen />
        </Button>
      </HStack>

      <Box>
        <Text>Description : </Text>
        <Text>{data?.description}</Text>
        <Button>
          <FaPen />
        </Button>
      </Box>

      <Text>{data?.created_at}</Text>
      <Text>{data?.deadline}</Text>
      <Text>{data?.done}</Text>
      <Text>{data?.is_owner}</Text>
      <Text>{data?.time_left}</Text>
      <Text>{data?.updated_at}</Text>
    </Box>
  );
}
