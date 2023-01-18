import { Box, Skeleton } from "@chakra-ui/react";

export default function TodoSkeleton() {
  return (
    <Box my={1}>
      <Skeleton fadeDuration={4} h="45px"></Skeleton>
    </Box>
  );
}
