import { Listbox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/outline";
import { classNames } from "@lib/util";
import React from "react";

const SelectList = ({ selectedItem, setSelectedItem, list }: any) => {
  return (
    <div className="relative w-full mb-3">
      <Listbox
        value={selectedItem}
        onChange={(e) => setSelectedItem({ name: e.name, id: e.id })}
        as="div"
        className="relative text-sm"
      >
        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500">
          <span className="flex items-center">
            <span className="ml-3 block truncate">{selectedItem.name}</span>
          </span>
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-50 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none">
          {list.map((item: { name: string; id: string }) => (
            <Listbox.Option
              key={item.name}
              className={({ active }) =>
                classNames(
                  active ? "text-white bg-green-500" : "text-gray-900",
                  "cursor-default select-none relative py-2 pl-3 pr-9"
                )
              }
              value={item}
            >
              {({ selected, active }) => (
                <>
                  <div className="flex items-center text-sm">
                    <span
                      className={classNames(
                        selected ? "font-semibold" : "",
                        "ml-3 block truncate"
                      )}
                    >
                      {item.name}
                    </span>
                  </div>

                  {selected ? (
                    <span
                      className={classNames(
                        active ? "text-white" : "text-green-500",
                        "absolute inset-y-0 right-0 flex items-center pr-4"
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default SelectList;
