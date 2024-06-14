import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Workers = ({ openModal, getData, searchTerm, selectedValues }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData();
      setData(fetchedData);
    };
    fetchData();
  }, [getData]);

  return (
    <main>
      <div className="grid grid-cols-4 gap-6">
        {data
          .filter((item) =>
            item.Name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((item) => {
            if (selectedValues.length > 0) {
              return (
                selectedValues.includes(item.Name) ||
                selectedValues.includes(item.Department.toLowerCase()) ||
                selectedValues.includes(item.EmployeeNumber.toString()) ||
                selectedValues.includes(item.Email.toLowerCase())
              );
            }
            return true;
          })
          .map((user, index) => (
            console.log("Filtered user:", user.Name),
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-center items-center space-x-4">
                  <img
                    className="w-12 h-12 rounded-full border border-gray-700"
                    src="/profile.png"
                    alt=""
                  />
                  <CardTitle>{user.Name}</CardTitle>
                </div>
                <CardDescription>{user.Department}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Position: {user.Position}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() =>
                    openModal({
                      name: user.Name,
                      department: user.Department,
                      position: user.Position,
                      employeeNumber: user.EmployeeNumber,
                      mail: user.Email,
                      phone: user.Phone,
                    })
                  }
                >
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </main>
  );
};

export default Workers;
