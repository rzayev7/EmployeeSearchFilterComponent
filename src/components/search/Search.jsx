import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';

export default function Search({searchTerm,setSearchTerm}) {
  

  return (
    <div className="flex items-center mb-6 w-96">
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
