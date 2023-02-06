import { Box, Skeleton } from "@chakra-ui/react";

export default function TodoSkeleton() {
  return (
    <Box my={1}>
      <Skeleton fadeDuration={4} h="100px" w="70%" mt={4}></Skeleton>
    </Box>
  );
}
