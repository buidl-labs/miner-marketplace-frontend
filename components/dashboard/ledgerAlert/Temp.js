import {
    ModalContent
} from "@chakra-ui/react"
import React from "react";

function Temp() {
  return (
    <>
      <ModalContent>
        <ModalHeader>Authenticate</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Above address will be used for authentication.Please check that you
            have ledger device of the above address.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
}

export default Temp;
