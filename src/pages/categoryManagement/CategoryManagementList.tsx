import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import FilterButton from "@/pages/components/FilterButton";
import ExportButton from "@/pages/components/ExportButton";
import HeaderDate from "@/pages/components/HeaderDate";
import HeaderComponent from "@/pages/components/HeaderComponent";
import ActionButton from "@/pages/components/ActionButton";
import TableList from "@/pages/components/TableList";
import Loading from "@/pages/components/Loading";
import SearchButton from "@/pages/components/SearchButton";

interface Enquiry {
  id: number;
  customerName: string;
  phone: string;
  email: string;
  alternatePhone: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  coordinates: string;
  propertySize: string;
  numberOfRooms: number;
  pestType: string;
  previousTreatment: string;
  previousTreatmentDetails: string;
  budgetRange: string;
  preferredServiceDate: string;
  additionalNotes: string;
  createdDate: string;
  status: "complaint" | "Sales";
}

interface SortConfig {
  key: keyof Enquiry | null;
  direction: "ascending" | "descending";
}

function CategoryManagementList() {
  // Sample data with proper typing
  const initialEnquiries: Enquiry[] = [
    {
      id: 1,
      customerName: "Aswanth",
      phone: "+1 555-123-4567",
      email: "john@example.com",
      alternatePhone: "+1 555-987-6543",
      street: "123 Main St",
      area: "Downtown",
      city: "Metropolis",
      state: "NY",
      pincode: "10001",
      landmark: "Near Central Park",
      coordinates: "40.7128° N, 74.0060° W",
      propertySize: "1500 sqft",
      numberOfRooms: 3,
      pestType: "Residential",
      previousTreatment: "Yes",
      previousTreatmentDetails: "Spray treatment 3 months ago",
      budgetRange: "$100-$200",
      preferredServiceDate: "Thiruvanathapuram",
      additionalNotes: "Pet friendly treatment preferred",
      status: "complaint",
      createdDate: "2023-05-20",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      phone: "+1 555-234-5678",
      email: "jane@example.com",
      alternatePhone: "+1 555-876-5432",
      street: "456 Oak Ave",
      area: "Uptown",
      city: "Gotham",
      state: "NJ",
      pincode: "07001",
      landmark: "Near City Hall",
      coordinates: "40.7357° N, 74.1724° W",
      propertySize: "2000 sqft",
      numberOfRooms: 4,
      pestType: "Residential",
      previousTreatment: "No",
      previousTreatmentDetails: "",
      budgetRange: "$200-$300",
      preferredServiceDate: "Kollam",
      additionalNotes: "Basement infestation",
      status: "Sales",
      createdDate: "2023-05-18",
    },
  ];

  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "ascending",
  });

  const requestSort = (key: keyof Enquiry) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...enquiries].sort((a, b) => {
      // Handle cases where values might be undefined
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === undefined || bValue === undefined) return 0;
      if (aValue < bValue) return direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setEnquiries(sortedData);
  };

  const getSortIcon = (key: keyof Enquiry): JSX.Element | null => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <FiChevronUp className="ml-1" />
    ) : (
      <FiChevronDown className="ml-1" />
    );
  };
  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setEnquiries(initialEnquiries);
    } else {
      const filtered = initialEnquiries.filter(
        (enquiry) =>
          enquiry.customerName.toLowerCase().includes(query.toLowerCase()) ||
          enquiry.phone.includes(query) ||
          enquiry.email.toLowerCase().includes(query.toLowerCase())
      );
      setEnquiries(filtered);
    }
  };
  return (
    <>
      <div className="container mx-auto bg-gray-150  border-b border-gray-200">
        <div className=" flex items-center justify-between bg-gray-150 p-4">
          <h2 className="text-xl font-bold text-black-800 flex items-center">
            <span className="text-gray-600 text-[18px] mr-2">
              Lead Management
            </span>
          </h2>
          <div className="flex items-center space-x-2">
            <HeaderDate />
          </div>
        </div>

        <div className="container mx-auto px-2">
          <HeaderComponent
            title="Enquiry List"
            breadcrumb="Dashboard / Enquiry / List"
            className="mb-4"
            showBackButton={true}
            showAddButton={true}
            addButtonLink="/enquiry-management"
          />
          <div
            className={`w-full relative rounded-2xl p-5 flex items-center justify-between overflow-hidden mb-4 bg-white border border-gray-200 shadow-md`}
          >
            {" "}
            <div className="flex space-x-2">
              <ExportButton />
              <FilterButton />
            </div>
            {/* Right-side buttons (example) */}
            <div className="flex space-x-2">
              <SearchButton onSearch={handleSearch} />
            </div>
          </div>{" "}
          <TableList
            columns={[
              {
                key: "id",
                header: "SL No",

                className: "w-16",
              },
              {
                key: "actions",
                header: "Actions",
                className: "w-15",
                render: (enquiry) => (
                  <ActionButton
                    view={true}
                    edit={true}
                    delete={true}
                    viewLink={`/enquiry-management/view`}
                    editLink={`/enquiry-management/edit`}
                    deleteLink={`/enquiry-management/delete/${enquiry.id}`}
                  />
                ),
              },
              {
                key: "status",
                header: "Status",
                className: "min-w-[150px]",
                render: (enquiry) => {
                  const [isOpen, setIsOpen] = useState(false);
                  const [lastUpdated] = useState(new Date().toLocaleString());
                  const [assignedTo] = useState("John Smith");
                  const [notes] = useState("Customer requested callback");
                  const [urgency, setUrgency] = useState<
                    "low" | "medium" | "high"
                  >("medium");

                  const handleStatusChange = (
                    newStatus: "complaint" | "Sales"
                  ) => {
                    setEnquiries((prevEnquiries) =>
                      prevEnquiries.map((e) =>
                        e.id === enquiry.id ? { ...e, status: newStatus } : e
                      )
                    );
                  };

                  const handleUrgencyChange = (
                    newUrgency: "low" | "medium" | "high"
                  ) => {
                    setUrgency(newUrgency);
                  };

                  return (
                    <div
                      className="relative inline-block text-left"
                      onMouseEnter={() => setIsOpen(true)}
                      onMouseLeave={() => setIsOpen(false)}
                    >
                      {/* Status Button */}
                      <button
                        type="button"
                        className={`group relative inline-flex items-center justify-between w-full px-2.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ease-out ${
                          enquiry.status === "complaint"
                            ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                        }`}
                      >
                        {/* Glow effect (smaller) */}
                        <span
                          className={`absolute -inset-0.25 rounded-full opacity-0 group-hover:opacity-50 blur-[2px] transition duration-200 ${
                            enquiry.status === "complaint"
                              ? "bg-green-200"
                              : "bg-blue-200"
                          }`}
                        ></span>

                        <div className="flex items-center space-x-1.5 relative">
                          {/* Compact status indicator */}
                          <span className="relative flex h-2 w-2">
                            <span
                              className={`absolute inline-flex h-full w-full rounded-full ${
                                enquiry.status === "complaint"
                                  ? "bg-green-500 group-hover:bg-green-600 animate-pulse"
                                  : "bg-blue-500 group-hover:bg-blue-600 animate-pulse"
                              }`}
                            ></span>
                            <span
                              className={`relative inline-flex rounded-full h-2 w-2 ${
                                enquiry.status === "complaint"
                                  ? "bg-green-600"
                                  : "bg-blue-600"
                              }`}
                            ></span>
                          </span>

                          {/* Status text */}
                          <span className="capitalize text-[0.7rem] tracking-tight">
                            {enquiry.status}
                          </span>
                        </div>

                        {/* Smaller chevron */}
                        <svg
                          className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                            isOpen ? "transform rotate-180" : ""
                          } ${
                            enquiry.status === "complaint"
                              ? "text-green-600/80"
                              : "text-blue-600/80"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>

                      {/* Enhanced Dropdown Panel */}
                      {isOpen && (
                        <div className="origin-top-left absolute left-0 mt-1 w-80 rounded-xl shadow-lg bg-white border border-gray-200 z-50 transition-all duration-200 ease-out">
                          <div className="p-4 space-y-4">
                            {/* Header with status indicator */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span
                                  className={`relative flex h-3 w-3 ${
                                    enquiry.status === "complaint"
                                      ? "text-green-500"
                                      : enquiry.status === "Sales"
                                      ? "text-blue-500"
                                      : "text-purple-500"
                                  }`}
                                ></span>
                                <h3 className="text-sm font-semibold text-gray-800">
                                  Lead Details
                                </h3>
                              </div>
                              <span
                                className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                                  enquiry.status === "complaint"
                                    ? "bg-green-100 text-green-800"
                                    : enquiry.status === "Sales"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {enquiry.status}
                              </span>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-3 gap-y-3 gap-x-2 text-sm">
                              <div className="text-gray-500 col-span-1">
                                Assigned To:
                              </div>
                              <div className="font-medium col-span-2 text-gray-800">
                                <span className="inline-flex items-center">
                                  {assignedTo || (
                                    <span className="text-gray-400">
                                      Unassigned
                                    </span>
                                  )}
                                </span>
                              </div>

                              <div className="text-gray-500 col-span-1">
                                Assigned On:
                              </div>
                              <div className="font-medium col-span-2 text-gray-800">
                                <span className="inline-flex items-center">
                                  {new Date().toLocaleString()}
                                  <svg
                                    className="ml-1.5 h-3.5 w-3.5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </span>
                              </div>

                              <div className="text-gray-500 col-span-1">
                                Urgency:
                              </div>
                              <div className="font-medium col-span-2 text-gray-800">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleUrgencyChange("low")}
                                    className={`px-2.5 py-1 text-xs rounded-full flex items-center transition-colors ${
                                      urgency === "low"
                                        ? "bg-green-50 text-green-700 border border-green-200 shadow-inner"
                                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5"></span>
                                    Low
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleUrgencyChange("medium")
                                    }
                                    className={`px-2.5 py-1 text-xs rounded-full flex items-center transition-colors ${
                                      urgency === "medium"
                                        ? "bg-yellow-50 text-yellow-700 border border-yellow-200 shadow-inner"
                                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1.5"></span>
                                    Medium
                                  </button>
                                  <button
                                    onClick={() => handleUrgencyChange("high")}
                                    className={`px-2.5 py-1 text-xs rounded-full flex items-center transition-colors ${
                                      urgency === "high"
                                        ? "bg-red-50 text-red-700 border border-red-200 shadow-inner"
                                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                    }`}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-1.5"></span>
                                    High
                                  </button>
                                </div>
                              </div>

                              <div className="text-gray-500 col-span-1">
                                Notes:
                              </div>
                              <div className="font-medium col-span-2 text-gray-800">
                                <div className="relative">
                                  <div className="absolute -left-1 top-1 w-0.5 h-5 bg-gray-200 rounded-full"></div>
                                  <p className="pl-2 text-sm line-clamp-2">
                                    {notes || (
                                      <span className="text-gray-400 italic">
                                        No notes added
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Three Action Buttons */}
                            <div className="grid grid-cols-3 gap-2 pt-2">
                              {/* Completed Button */}
                              <button
                                onClick={() => handleStatusChange("complaint")}
                                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 ${
                                  enquiry.status === "complaint"
                                    ? "bg-green-600 text-white shadow-md hover:bg-green-700"
                                    : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                                }`}
                              >
                                <svg
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                <span>Completed</span>
                              </button>

                              {/* Follow Up Button */}
                              <button
                                onClick={() => handleStatusChange("Sales")}
                                className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 ${
                                  enquiry.status === "Sales"
                                    ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                                    : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                                }`}
                              >
                                <svg
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <span>Follow Up</span>
                              </button>

                              {/* View Button */}
                              <button className="px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100">
                                <svg
                                  className="h-3.5 w-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                                <span>View</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                },
              },
              {
                key: "customerName",
                header: "Customer Name",

                className: "min-w-[120px]",
              },
              {
                key: "phone",
                header: "Phone",
                className: "min-w-[120px]",
                render: (enquiry) => {
                  const [isOpen, setIsOpen] = useState(false);

                  return (
                    <div className="relative group">
                      {/* Phone number container that triggers the dropdown */}
                      <div
                        className="inline-block cursor-pointer hover:text-blue-600 transition-colors"
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {enquiry.phone}
                      </div>

                      {/* Dropdown modal */}
                      <div
                        className={`absolute z-[100] w-64 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 mt-1 left-0 transition-all duration-200 ease-out ${
                          isOpen
                            ? "opacity-100 visible scale-100"
                            : "opacity-0 invisible scale-95"
                        }`}
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                      >
                        {/* Header with gradient background */}
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3">
                          <h3 className="font-semibold text-sm uppercase tracking-wider">
                            Phone Actions
                          </h3>
                        </div>

                        <div className="flex flex-col p-2 space-y-1">
                          {/* Call Now - Enhanced with pulse animation */}
                          <a
                            href={`tel:${enquiry.phone.replace(
                              /[^0-9+]/g,
                              ""
                            )}`}
                            className="group flex items-center px-3 py-3 hover:bg-blue-50 rounded-lg text-sm transition-all duration-200 hover:shadow-sm"
                          >
                            <div className="relative">
                              <div className="absolute -inset-1 bg-blue-100 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-3 text-blue-600 group-hover:animate-pulse"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 group-hover:text-blue-700">
                                Call Now
                              </div>
                              <div className="text-xs text-gray-500 group-hover:text-blue-600">
                                {enquiry.phone}
                              </div>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-auto text-gray-400 group-hover:text-blue-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </a>

                          {/* Copy Number - With feedback animation */}
                          <button
                            className="group flex items-center px-3 py-3 hover:bg-gray-50 rounded-lg text-sm transition-all duration-200 hover:shadow-sm"
                            onClick={() => {
                              navigator.clipboard.writeText(enquiry.phone);
                              // Add toast notification here
                            }}
                          >
                            <div className="relative">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-3 text-gray-600 group-hover:text-purple-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                                />
                              </svg>
                              <div className="absolute inset-0 bg-purple-100 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                            </div>
                            <span className="font-medium text-gray-800 group-hover:text-purple-700">
                              Copy Number
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-auto text-gray-400 group-hover:text-purple-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </button>

                          {/* WhatsApp - Vibrant green styling */}
                          <a
                            href={`https://wa.me/${enquiry.phone.replace(
                              /[^0-9+]/g,
                              ""
                            )}`}
                            className="group flex items-center px-3 py-3 hover:bg-green-50 rounded-lg text-sm transition-all duration-200 hover:shadow-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="relative">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mr-3 text-green-600 group-hover:animate-bounce"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                              </svg>
                              <div className="absolute inset-0 bg-green-100 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                            </div>
                            <span className="font-medium text-gray-800 group-hover:text-green-700">
                              WhatsApp Message
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-auto text-gray-400 group-hover:text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </a>
                        </div>

                        {/* Optional footer */}
                        <div className="px-3 py-2 bg-gray-50 text-xs text-gray-500 border-t border-gray-100">
                          Click outside to close
                        </div>
                      </div>
                    </div>
                  );
                },
              },
              {
                key: "email",
                header: "Email",

                className: "min-w-[200px]",
              },
              {
                key: "city",
                header: "City",

                className: "min-w-[120px]",
              },
              {
                key: "pestType",
                header: "Type",

                className: "min-w-[150px]",
              },
              {
                key: "preferredServiceDate",
                header: "District",
              },

              {
                key: "createdDate",
                header: "Created Date",

                className: "min-w-[140px]",
              },
            ]}
            data={enquiries}
            onSort={(column, order) => requestSort(column as keyof Enquiry)}
            noDataMessage={
              <>
                <Loading></Loading>
              </>
            }
          />
          <div className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-md shadow-sm mt-4">
            <p className="text-sm text-gray-500">Showing 1–3 of 81</p>

            <div className="flex gap-2">
              <button className="inline-flex items-center justify-center w-8 h-8 rounded border border-gray-300 text-gray-500 hover:bg-gray-100">
                &lt;
              </button>
              <button className="inline-flex items-center justify-center w-8 h-8 rounded border border-gray-300 text-gray-500 hover:bg-gray-100">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryManagementList;
