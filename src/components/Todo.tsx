import {
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaAngleRight, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ITodoProps {
  pk: number;
  done: boolean;
  title: string;
  deadline: string;
}

export default function Todo({ pk, done, title, deadline }: ITodoProps) {
  return (
    <Grid
      my={1}
      mx={{ base: 8, md: "auto" }}
      maxW={"686px"}
      h={"6vh"}
      justifyContent={"center"}
      justifyItems={"center"}
      alignItems={"center"}
      templateRows={"1fr"}
      templateColumns={"0.1fr 1fr 1fr 0.1fr"}
      borderBottomWidth={"1px"}
      borderRadius={"base"}
    >
      <GridItem>
        <Button variant={"link"}>{done ? <FaCheck /> : null}</Button>
      </GridItem>

      <GridItem>
        <Heading fontSize={"lg"} noOfLines={1}>
          {title}
        </Heading>
      </GridItem>

      <GridItem>
        <VStack spacing={-2}>
          <Text fontSize={"sm"}>
            {deadline !== null ? `${deadline.split(".")[0]}까지` : null}
          </Text>
          <Text>{deadline !== null ? "time left 남음" : null}</Text>
        </VStack>
      </GridItem>

      <GridItem>
        <Link to={`todo/${pk}`}>
          <Button variant={"link"}>
            <FaAngleRight />
          </Button>
        </Link>
      </GridItem>
    </Grid>
  );
}
