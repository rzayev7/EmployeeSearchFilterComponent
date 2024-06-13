import React from "react";
import { VStack, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Button, Text } from "@chakra-ui/react";

function NestedFilterDrawer({ category,items, onClose }) {
  return (
    <>
      <Drawer placement="right" onClose={onClose} isOpen={true}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NestedFilterDrawer;
