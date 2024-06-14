import React, { useState, useEffect } from 'react';
import Workers from './main/Workers';
import ModalCentered from './modal/Modal';
import FilterDrawer from './filter/Filter';
import Search from './search/Search';
import SelectedFilters from './filter/SelectedFilters';

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

  const clearFilter = (value) => {
    setSelectedValues(selectedValues.filter(item => item !== value));
  };

  return (
    <>
      {isOpen && (
        <ModalCentered isOpen={isOpen} onClose={closeModal} modalContent={modalContent} />
      )}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-5xl mb-24">Our employees</h1>
      </div>
      <div className="flex flex-row justify-between mb-12">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterDrawer setSelectedValues={setSelectedValues} getData={getData} />
      </div>
      
      <SelectedFilters selectedValues={selectedValues} clearFilter={clearFilter} />
      
      <Workers
        selectedValues={selectedValues}
        openModal={openModal}
        getData={getData}
        searchTerm={searchTerm}
      />
    </>
  );
}
