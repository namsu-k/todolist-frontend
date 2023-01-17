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
import SocialLogin from "./SocialLogin";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <VStack>
            <Input placeholder="Username" />
            <Input type={"password"} placeholder="Password" />
            <Button w="100%" colorScheme={"blue"}>
              Log In
            </Button>
          </VStack>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
