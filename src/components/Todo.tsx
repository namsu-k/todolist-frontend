import { Button, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { FaAngleDown, FaCheck } from "react-icons/fa";

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
      mx={8}
      minH={"45px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      templateColumns={"40px 1fr 1fr 40px"}
      borderBottomWidth={"1px"}
      borderRadius={"base"}
    >
      <GridItem w="40px" h="40px" borderRadius={"base"}>
        <Button
          w="100%"
          h="100%"
          size="auto"
          variant={"link"}
          borderLeftWidth="1px"
        >
          {done ? <FaCheck /> : null}
        </Button>
      </GridItem>
      <GridItem
        textAlign={"center"}
        h="40px"
        lineHeight={"40px"}
        borderLeftWidth="1px"
        borderRadius={"base"}
      >
        {title}
      </GridItem>
      <GridItem h="40px" borderLeftWidth="1px" borderRadius={"base"}>
        <VStack spacing={0}>
          <Text noOfLines={1} fontSize={"xs"}>
            {deadline === null ? null : `${deadline}까지`}
          </Text>
          <Text>{deadline === null ? null : "timeleft"}</Text>
        </VStack>
      </GridItem>
      <GridItem w="40px" h="40px" borderRadius={"base"}>
        <Button
          w="100%"
          h="100%"
          size="auto"
          variant={"link"}
          borderLeftWidth="1px"
        >
          <FaAngleDown />
        </Button>
      </GridItem>
    </Grid>
  );
}
