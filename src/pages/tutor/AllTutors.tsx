import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import TutorCardGrid from "./TutorCardGrid";
import Navbar from "../../components/common/navbar";
import { useQuery } from "react-query";
import { findSubjects } from "../../api/adminapi";
import { Slider } from "@mui/material";

const sortOptions = [
  { name: "Best Rating", value: "rating", current: false },
  { name: "Price: Low to High", value: "low", current: false },
  { name: "Price: High to Low", value: "high", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AllTutors() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { data, isLoading } = useQuery("findSubjects", findSubjects);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [value, setValue] = useState([0, 0]);
  const rawData = data?.data;
  const [sortOption, setSortOption] = useState("Best Rating"); // Add sorting state

  const [filteredData, setFilteredData] = useState({
    subjects: [],
    classes: [],
  });

  if (rawData) {
    var filters = Object.keys(rawData)
      .map((key) => {
        if (Array.isArray(rawData[key])) {
          return {
            id: key,
            name: key.charAt(0).toUpperCase() + key.slice(1),
            options: rawData[key].map((value) => ({
              value: value,
              label: value.charAt(0).toUpperCase() + value.slice(1),
              checked: false,
            })),
          };
        }
        return null; // Handle non-array values if necessary
      })
      .filter(Boolean);
    console.log(filters);
  }

  const handleCheckboxChange = (sectionId, optionValue, isChecked) => {
    console.log(
      `Checkbox change: Section ${sectionId}, Option ${optionValue}, Checked: ${isChecked}`
    );

    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (isChecked) {
        updatedFilters[sectionId] = [
          ...(updatedFilters[sectionId] || []),
          optionValue,
        ];
      } else {
        updatedFilters[sectionId] = (updatedFilters[sectionId] || []).filter(
          (value) => value !== optionValue
        );
      }

      console.log("Updated Filters:", updatedFilters);

      return updatedFilters;
    });
  };

  const applyFilters = () => {
    const selectedSubjects = selectedFilters.subjects || [];
    const selectedClasses = selectedFilters.classes || [];

    console.log("Selected Subjects:", selectedSubjects);
    console.log("Selected Classes:", selectedClasses);

    setFilteredData({
      subjects: selectedSubjects,
      classes: selectedClasses,
    });

    console.log("Filtered Data:", filteredData);
  };

  console.log(filteredData);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectedFilters({ ...selectedFilters, price: value });
  };
  console.log(selectedFilters, "this is the selected filters");


  const handleSortChange = (selectedSortOption) => {
    setSortOption(selectedSortOption);
    setSelectedFilters({ ...selectedFilters, sort: [selectedSortOption.toLowerCase()] });
  };

  return (
    <>
      <Navbar />
      <div className=" h-36 bg-3447AE text-white">
        <div className="text-right">
          <h1 className=" text-5xl font-bold me-2 sm:me-32">
            Find Your <br />
            Perfect Tutor
          </h1>
        </div>
      </div>
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>

                      {filters &&
                        filters.map((section) => (
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="border-t border-gray-200 px-4 py-6"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                  <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section.name}
                                    </span>
                                    <span className="ml-6 flex items-center">
                                      {open ? (
                                        <MinusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            onClick={(e) => {
                                              const isChecked =
                                                e.target.checked;
                                              console.log("dsffsda");

                                              handleCheckboxChange(
                                                section.id,
                                                option.value,
                                                isChecked
                                              );
                                            }}
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        ))}
                      <div className="flex w-64 m-auto items-center h-32 justify-center">
                        <div className="py-1 relative min-w-full">
                          <Slider
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `$ ${value}`}
                            getAriaValueText={(value) => `$ ${value}`}
                            min={0}
                            max={5000}
                          />
                        </div>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                {" "}
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <li
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}onClick={() => handleSortChange(option.value)}
                              >
                                {option.name}
                                
                              </li>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <h3 className="sr-only text-black">Categories</h3>

                  {filters?.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    onClick={(e) => {
                                      const isChecked = e.target.checked;

                                      handleCheckboxChange(
                                        section.id,
                                        option.value,
                                        isChecked
                                      );
                                    }}
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  <div className="flex w-64 m-auto items-center h-32 justify-center">
                    <div className="py-1 relative min-w-full">
                      <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `$ ${value}`}
                        getAriaValueText={(value) => `$ ${value}`}
                        min={0}
                        max={5000}
                      />
                    </div>
                  </div>
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {filters && (
                    <TutorCardGrid
                      Data={filteredData}
                      selectedFilters={selectedFilters}
                    />
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
