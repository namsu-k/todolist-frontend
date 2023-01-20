import {
  Editable,
  EditableInput,
  EditablePreview,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaAngleLeft, FaCheck, FaPen } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
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
    <Grid
      my={1}
      mx={{ base: 8, md: "auto" }}
      maxW={"686px"}
      minH={"6vh"}
      justifyContent={"center"}
      justifyItems={"center"}
      alignItems={"center"}
      borderBottomWidth={"1px"}
      borderRadius={"base"}
    >
      <GridItem w="100%">
        <Editable defaultValue={data?.title}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </GridItem>
    </Grid>
  );
}
