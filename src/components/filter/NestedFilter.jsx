import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Input,
  Text,
  Checkbox,
  CheckboxGroup,
  VStack
} from "@chakra-ui/react";

function NestedFilterDrawer({ onClose, seeAllClickedData, onApply }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    console.log("seeAllClickedData:", seeAllClickedData); // Log seeAllClickedData to ensure it has data
  }, [seeAllClickedData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (selectedValues) => {
    setSelectedItems(selectedValues);
  };

  const handleApply = () => {
    onApply(selectedItems);
    onClose();
  };

  const filteredData = seeAllClickedData.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Filtered Data:", filteredData); // Log filtered data to debug

  return (
    <>
      <Drawer placement="right" onClose={onClose} isOpen={true}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Detailed View</DrawerHeader>
          <DrawerBody>
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              mb={4}
            />
            {filteredData.length > 0 ? (
              <CheckboxGroup value={selectedItems} onChange={handleCheckboxChange}>
                <VStack align="start">
                  {filteredData.map((item, index) => (
                    <Checkbox key={index} value={item}>
                      {item}
                    </Checkbox>
                  ))}
                </VStack>
              </CheckboxGroup>
            ) : (
              <Text>No results found</Text>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleApply}>Apply</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NestedFilterDrawer;
