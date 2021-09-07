import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export const FriendsIndex = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text
        fontSize="lg"
        color="white"
        mr={6}
        cursor="pointer"
        onClick={onOpen}
      >
        友達一覧
      </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>友達一覧</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>友達</Tab>
                <Tab>申請中</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <p>友達！</p>
                </TabPanel>
                <TabPanel>
                  <p>申請中！</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
