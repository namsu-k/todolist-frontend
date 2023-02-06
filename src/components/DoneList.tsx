import { Button, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { FaAngleRight, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ITodoProps {
  pk: number;
  done: boolean;
  title: string;
}

export default function DoneList({ pk, done, title }: ITodoProps) {
  return (
    <Grid
      my={1}
      mx={{ base: 8, md: "auto" }}
      maxW={"686px"}
      minH={"6vh"}
      justifyContent={"center"}
      justifyItems={"center"}
      alignItems={"center"}
      templateColumns={"0.1fr 1fr 1fr 0.1fr"}
      borderBottomWidth={"1px"}
      borderRadius={"base"}
    >
      <GridItem>
        <Button variant={"ghost"}>{done ? <FaCheck /> : null}</Button>
      </GridItem>

      <GridItem>
        <Heading fontSize={"lg"} noOfLines={1}>
          {title}
        </Heading>
      </GridItem>

      {/* <GridItem>
        <Text fontSize={"sm"}>{date_done} 완료</Text>
      </GridItem> */}

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
