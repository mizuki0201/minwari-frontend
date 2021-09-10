import {
  Flex,
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
          <ModalHeader textAlign="center">友達一覧</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab _focus={{ boxShadow: "none" }}>友達</Tab>
                <Tab _focus={{ boxShadow: "none" }}>申請中</Tab>
                <Tab _focus={{ boxShadow: "none" }}>受けた申請</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {/* ある程度のheightになったらスクロールできるようにしたい */}
                  <Flex align="center" mb={5}>
                    <Text mr={5} fontSize="xl">
                      ユーザー1
                    </Text>
                    <Text fontSize="sm">@user1ID</Text>
                  </Flex>
                  <Flex align="center">
                    <Text mr={5} fontSize="xl">
                      ユーザー2
                    </Text>
                    <Text fontSize="sm">@user2ID</Text>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex align="center" mb={5}>
                    <Text mr={5} fontSize="xl">
                      ユーザー3
                    </Text>
                    <Text fontSize="sm">@user3ID</Text>
                  </Flex>
                  <Flex align="center">
                    <Text mr={5} fontSize="xl">
                      ユーザー4
                    </Text>
                    <Text fontSize="sm">@user4ID</Text>
                  </Flex>
                </TabPanel>
                <TabPanel>
                  <Flex align="center" mb={5}>
                    <Text mr={5} fontSize="xl">
                      ユーザー5
                    </Text>
                    <Text fontSize="sm">@user5ID</Text>
                  </Flex>
                  <Flex align="center">
                    <Text mr={5} fontSize="xl">
                      ユーザー6
                    </Text>
                    <Text fontSize="sm">@user6ID</Text>
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
