import React, { useState } from "react";
import { AscDscFilterIcon, CategoryFilterIcon, IncomeSvg } from "./SVG/SvgIcon";
import SingleIncome from "./SingleIncome";

const IncomeSection = ({
    transactions,
    handleEdit,
    setType,
    setData,
    handleDeleteTransaction,
}) => {
    const [isAscDescFilterOpen, setIsAscDescFilterOpen] = useState(false);
    const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const categories = ["Salary", "Outsourcing", "Bond", "Dividend"];
    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((cat) => cat !== category)
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const sortedIncomeTransactions = [...transactions]
        .filter((tnx) => tnx.type === "Income")
        .filter(
            (tnx) =>
                selectedCategories.length === 0 ||
                selectedCategories.includes(tnx.category)
        )
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return a.amount - b.amount;
            } else if (sortOrder === "desc") {
                return b.amount - a.amount;
            }
            return 0;
        });
    return (
        <div className="border rounded-md relative">
            <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base">
                        <IncomeSvg />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold leading-7 text-gray-800">
                            Income
                        </h3>
                    </div>
                </div>
                <div>
                    <div className="relative inline-block   text-left">
                        <div>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={() => setIsAscDescFilterOpen(!isAscDescFilterOpen)}
                            >
                                <AscDscFilterIcon />
                            </button>
                        </div>

                        <div
                            className={`absolute ${isAscDescFilterOpen ? "visible" : "invisible"
                                } z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex="-1"
                        >
                            <div className="py-1" role="none">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-0"
                                    onClick={() => setSortOrder("asc")}
                                >
                                    Low to High
                                </a>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                                    role="menuitem"
                                    tabIndex="-1"
                                    id="menu-item-0"
                                    onClick={() => setSortOrder("desc")}
                                >
                                    High to Low
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative inline-block  text-left">
                        <div>
                            <button
                                type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                id="filter-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={() => setIsCategoryFilterOpen(!isCategoryFilterOpen)}
                            >
                                <CategoryFilterIcon />
                            </button>
                        </div>

                        <div
                            className={`absolute ${isCategoryFilterOpen ? "visible" : "invisible"
                                } right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="filter-button"
                            tabIndex="-1"
                            id="filter-dropdown"
                        >
                            <div className="py-1" role="none">
                                {categories.map((category) => (
                                    <label
                                        key={category}
                                        className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
                                    >
                                        <input
                                            type="checkbox"
                                            value={category}
                                            className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)} // Toggle category
                                        />
                                        <span className="ml-2">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 divide-y">
                {sortedIncomeTransactions.map((tnx) => (
                    <SingleIncome
                        key={tnx.id}
                        transaction={tnx}
                        handleEdit={handleEdit}
                        setType={setType}
                        setData={setData}
                        handleDeleteTransaction={handleDeleteTransaction}
                    />
                ))}
            </div>
        </div>
    );
};

export default IncomeSection;
