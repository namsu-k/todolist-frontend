import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <VStack>
            <Input placeholder="Username" />
            <Input type={"password"} placeholder="Password" />
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <Button w="100%" colorScheme={"blue"}>
              Sign Up
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
