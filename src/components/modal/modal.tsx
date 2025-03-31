import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

export const TextModal = ({
  cancelText,
  acceptText,
  bodyText,
  isOpen,
  onOpenChange,
  acceptIcon,
}: {
  cancelText: string;
  acceptText: string;
  bodyText: string;
  isOpen: boolean;
  onOpenChange: () => void;
  acceptIcon?: React.ReactNode;
}) => {
  return (
    <Modal
      classNames={{
        base: "p-6",
        header: "p-0 mb-4",
        body: "p-0 mb-6",
        closeButton: "hidden",
        footer: "p-0",
      }}
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.15,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.1,
              ease: "easeIn",
            },
          },
        },
      }}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="text-2xl">Xóa tài khoản</ModalHeader>
            <ModalBody>{bodyText}</ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                {cancelText}
              </Button>
              <Button
                color="primary"
                startContent={acceptIcon}
                onPress={onClose}
              >
                {acceptText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
