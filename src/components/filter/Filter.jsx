import React, { useState, useEffect } from "react";
import {
  Checkbox,
  CheckboxGroup,
  VStack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import NestedFilterDrawer from "./NestedFilter";

const FilterDrawer = ({ getData, setSelectedValues }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [seeAll, setSeeAll] = useState([]);
  const [query, setQuery] = useState({
    mail: "",
    name: "",
    employeeNumber: "",
    department: "",
  });
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [showNestedDrawer, setShowNestedDrawer] = useState(false);
  const [showAll, setShowAll] = useState({
    mail: false,
    name: false,
    employeeNumber: false,
    department: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      console.log("Fetched data:", fetchedData); // Log fetched data
      setData(fetchedData);
    };
    fetchData();
  }, [getData]);

  const handleCheckboxChange = (selectedValues) => {
    setSelectedFilter(selectedValues);
    console.log("Selected Filters:", selectedValues);
  };

  const applySelectedCheckbox = () => {
    setSelectedValues(selectedFilter);
    console.log("Applying Filters:", selectedFilter);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));
  };

  const saveClickedItems = (category) => {
    let items;
    switch (category) {
      case "mail":
        items = data
          .filter((item) =>
            item.Email.toLowerCase().includes(query.mail.toLowerCase())
          )
          .map((item) => item.Email);
        break;
      case "name":
        items = data
          .filter((item) =>
            item.Name.toLowerCase().includes(query.name.toLowerCase())
          )
          .map((item) => item.Name);
        break;
      case "employeeNumber":
        items = data
          .filter((item) =>
            item.EmployeeNumber.toString().includes(query.employeeNumber)
          )
          .map((item) => item.EmployeeNumber.toString());
        break;
      case "department":
        items = [
          ...new Set(data.map((item) => item.Department.toLowerCase())),
        ].filter((department) =>
          department.includes(query.department.toLowerCase())
        );
        break;
      default:
        items = [];
    }
    setSeeAll(items);
    setShowNestedDrawer(true);
    console.log("seeAll items:", items); // Log items to ensure correct data is being set
  };

  const renderFilterOptions = () => {
    if (data.length === 0) {
      return <Text>Loading...</Text>;
    }

    const uniqueDepartments = [
      ...new Set(data.map((item) => item.Department.toLowerCase())),
    ];

    return (
      <>
        <Box>
          <Text fontSize="lg">Corporate email</Text>
          <VStack align="start">
            <CheckboxGroup
              value={selectedFilter}
              onChange={handleCheckboxChange}
            >
              {data
                .filter((item) =>
                  item.Email.toLowerCase().includes(query.mail.toLowerCase())
                )
                .slice(0, showAll.mail ? undefined : 5)
                .map((item, index) => (
                  <Checkbox key={index} value={item.Email}>
                    {item.Email}
                  </Checkbox>
                ))}
            </CheckboxGroup>
          </VStack>
          {data.filter((item) =>
            item.Email.toLowerCase().includes(query.mail.toLowerCase())
          ).length > 5 && (
            <Button onClick={() => saveClickedItems("mail")} mt={2}>
              See All
            </Button>
          )}
        </Box>

        <Box>
          <Text fontSize="lg">Name</Text>
          <VStack align="start">
            <CheckboxGroup
              value={selectedFilter}
              onChange={handleCheckboxChange}
            >
              {data
                .filter((item) =>
                  item.Name.toLowerCase().includes(query.name.toLowerCase())
                )
                .slice(0, showAll.name ? undefined : 5)
                .map((item, index) => (
                  <Checkbox key={index} value={item.Name}>
                    {item.Name}
                  </Checkbox>
                ))}
            </CheckboxGroup>
          </VStack>
          {data.filter((item) =>
            `${item.Name}`
              .toLowerCase()
              .includes(query.name.toLowerCase())
          ).length > 5 && (
            <Button onClick={() => saveClickedItems("name")} mt={2}>
              See All
            </Button>
          )}
        </Box>

        <Box>
          <Text fontSize="lg">Employee numbers</Text>
          <VStack align="start">
            <CheckboxGroup
              value={selectedFilter}
              onChange={handleCheckboxChange}
            >
              {data
                .filter((item) =>
                  item.EmployeeNumber.toString().includes(query.employeeNumber)
                )
                .slice(0, showAll.employeeNumber ? undefined : 5)
                .map((item, index) => (
                  <Checkbox key={index} value={item.EmployeeNumber.toString()}>
                    {item.EmployeeNumber}
                  </Checkbox>
                ))}
            </CheckboxGroup>
          </VStack>
          {data.filter((item) =>
            item.EmployeeNumber.toString().includes(query.employeeNumber)
          ).length > 5 && (
            <Button onClick={() => saveClickedItems("employeeNumber")} mt={2}>
              See All
            </Button>
          )}
        </Box>

        <Box>
          <Text fontSize="lg">Departments</Text>
          <VStack align="start">
            <CheckboxGroup
              value={selectedFilter}
              onChange={handleCheckboxChange}
            >
              {uniqueDepartments
                .filter((department) =>
                  department.includes(query.department.toLowerCase())
                )
                .slice(0, showAll.department ? undefined : 5)
                .map((department, index) => (
                  <Checkbox key={index} value={department}>
                    {department}
                  </Checkbox>
                ))}
            </CheckboxGroup>
          </VStack>
          {uniqueDepartments.filter((department) =>
            department.includes(query.department.toLowerCase())
          ).length > 5 && (
            <Button onClick={() => saveClickedItems("department")} mt={2}>
              See All
            </Button>
          )}
        </Box>
      </>
    );
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" variant="outline">
        Filter
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>
          <DrawerBody>{renderFilterOptions()}</DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                console.log("Selected Filters:", selectedFilter);
                onClose();
                applySelectedCheckbox();
              }}
            >
              Apply
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {showNestedDrawer && (
        <NestedFilterDrawer 
          seeAllClickedData={seeAll}
          onClose={() => setShowNestedDrawer(false)}
          onApply={(items) => {
            setSelectedValues(items);
            setShowNestedDrawer(false);
          }}
        />
      )}
    </>
  );
};

export default FilterDrawer;
          