import React, { useState, useEffect } from 'react';
import Workers from './main/Workers';
import ModalCentered from './modal/Modal';
import FilterDrawer from './filter/Filter';
import Search from './search/Search';

export async function getData() {
  const result = await fetch("/data/db.json");
  const data = await result.json();
  return data;
}

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState([]);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
  };

  return (
    <>
      {isOpen && <ModalCentered isOpen={isOpen} onClose={closeModal} modalContent={modalContent} />}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-5xl mb-24">Our employees</h1>
      </div>
      <div className='flex flex-row justify-between'>
    
      <Search className="mb-12" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterDrawer setSelectedValues={setSelectedValues} getData={getData} />
      </div>
      <Workers selectedValues={selectedValues} openModal={openModal} getData={getData} searchTerm={searchTerm} />
    </>
  );
}
