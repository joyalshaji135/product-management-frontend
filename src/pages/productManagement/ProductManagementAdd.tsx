import { useState } from 'react';
import HeaderDate from '@/pages/components/HeaderDate';
import HeaderComponent from '@/pages/components/HeaderComponent';
import FormButtons from '@/pages/components/FormButtons';
import Dropdowns from '@/pages/components/Dropdowns';
import { FiMapPin, FiTool, FiCalendar, FiPhone, FiInfo, FiX, FiSearch, FiPackage } from 'react-icons/fi';
import Loading from '@/pages/components/Loading';

const dummyCustomerData = [
    {
        id: 1,
        name: "John Doe",
        phone: "8304848359",
        email: "john@example.com",
        area: "Kowdiar",
        state: "Kerala",
        district: "Thiruvananthapuram",
        serviceType: "CMS",
        serviceDate: "2023-05-15",
        amount: "₹2,500",
        treatmentDetails: "Cockroach treatment for 2BHK apartment",
        propertySize: "1200 sqft",
        rooms: "3",
        pestType: "Cockroaches",
        landmark: "Near Kowdiar Palace",
        pincode: "695003",
        city: "Thiruvananthapuram",
        street: "MG Road",
        enquiryType: "Residential",
        residentialType: "Apartment",
        enquirySource: "Phone",
        enquiryCategory: "Complaint",
        urgency: "Medium",
        budget: "₹2,000 - ₹3,000",
        preferredDate: "2023-05-20"
    },
    {
        id: 2,
        name: "Jane Smith",
        phone: "8765432109",
        email: "jane@example.com",
        area: "Vazhuthacaud",
        state: "Kerala",
        district: "Thiruvananthapuram",
        serviceType: "Termite Control",
        serviceDate: "2023-06-20",
        amount: "₹3,800",
        treatmentDetails: "Termite treatment for independent house",
        propertySize: "1800 sqft",
        rooms: "4",
        pestType: "Termites",
        landmark: "Near Ayurveda College",
        pincode: "695014",
        city: "Thiruvananthapuram",
        street: "PMG Junction",
        enquiryType: "Residential",
        residentialType: "Villa",
        enquirySource: "Website",
        enquiryCategory: "Request",
        urgency: "High",
        budget: "₹3,500 - ₹4,000",
        preferredDate: "2023-06-25"
    },
    {
        id: 3,
        name: "Robert Johnson",
        phone: "7654321098",
        email: "robert@example.com",
        area: "Pattom",
        state: "Kerala",
        district: "Thiruvananthapuram",
        serviceType: "Rodent Control",
        serviceDate: "2023-07-10",
        amount: "₹2,200",
        treatmentDetails: "Rodent proofing for office space",
        propertySize: "2500 sqft",
        rooms: "6",
        pestType: "Rodents",
        landmark: "Near Pattom Palace",
        pincode: "695004",
        city: "Thiruvananthapuram",
        street: "Sasthamangalam Road",
        enquiryType: "Commercial",
        commercialType: "Office",
        enquirySource: "Walk-in",
        enquiryCategory: "Query",
        urgency: "Low",
        budget: "₹2,000 - ₹2,500",
        preferredDate: "2023-07-15"
    }
];

function ProductManagementAdd() {
    const [state, setState] = useState<string>("Kerala");
    const [enquirySource, setEnquirySource] = useState<string>("Phone");
    const [enquiryCategory, setEnquiryCategory] = useState<string>("Complaint");
    const [serviceType, setServiceType] = useState<string>("CMS");
    const [urgency, setUrgency] = useState<string>("Low");
    const [pestType, setPestType] = useState<string>("");
    const [previousTreatment, setPreviousTreatment] = useState<string>("");
    const [district, setDistrict] = useState<string>("Thiruvanathapuram");
    const [customEnquirySource, setCustomEnquirySource] = useState<string>("");
    const [customEnquiryCategory, setCustomEnquiryCategory] = useState<string>("");
    const [customServiceType, setCustomServiceType] = useState<string>("");
    const [customPestType, setCustomPestType] = useState<string>("");
    const [enquiryType, setEnquiryType] = useState<string>("");
    const [attend, setAttend] = useState<string>("");
    const [assign, setAssign] = useState<string>("");
    const [residentialType, setResidentialType] = useState<string>("");
    const [commercialType, setCommercialType] = useState<string>("");
    const [phoneSearch, setPhoneSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [showFormSections, setShowFormSections] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        inspectionNeeded: false
    });

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [street, setStreet] = useState("");
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [landmark, setLandmark] = useState("");
    const [propertySize, setPropertySize] = useState("");
    const [rooms, setRooms] = useState("");
    const [previousTreatmentDetails, setPreviousTreatmentDetails] = useState("");
    const [budget, setBudget] = useState("");
    const [preferredDate, setPreferredDate] = useState("");
    const [notes, setNotes] = useState("");

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            inspectionNeeded: e.target.checked
        });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Your form submission logic
            console.log('Submitting form...');
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Form submitted successfully');
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        // Reset form or navigate away
        console.log('Form cancelled');
    };

    const hasFormData = () => {
        if (previousTreatment === "Yes") {
            return !!selectedCustomer;
        } else {
            return (
                firstName.trim() !== '' &&
                lastName.trim() !== '' &&
                phone.trim() !== '' &&
                street.trim() !== '' &&
                area.trim() !== '' &&
                city.trim() !== '' &&
                pincode.trim() !== '' &&
                landmark.trim() !== ''
            );
        }
    };

    const handlePickUpFrom = () => {
        setShowFormSections(!showFormSections);
    };

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        return e.target.value;
    };

    const handleSearch = () => {
        if (!phoneSearch) return;

        setIsSearching(true);
        // Simulate API call with timeout
        setTimeout(() => {
            const results = dummyCustomerData.filter(customer =>
                customer.phone.includes(phoneSearch)
            );
            setSearchResults(results);
            setIsSearching(false);
        }, 800);
    };

    const handleSelectCustomer = (customer: any) => {
        setSelectedCustomer(customer);
    };

    const handleClearSelection = () => {
        setSelectedCustomer(null);
        setPhoneSearch("");
        setSearchResults([]);
    };

    return (
        <div className="container mx-auto bg-gray-150 border-b border-gray-200">
            <div className="flex items-center justify-between bg-gray-150 p-4">
                <h2 className="text-xl font-bold text-black-800 flex items-center">
                    <span className="text-gray-600 text-[18px] mr-2">Lead Management</span>
                </h2>
                <div className="flex items-center space-x-2">
                    <HeaderDate />
                </div>
            </div>

            <div className="container mx-auto px-2">
                <HeaderComponent
                    title="Enquiry Add"
                    breadcrumb="Dashboard / Enquiry / Add"
                    className="mb-4"
                    showBackButton={true}
                    showAddButton={false}
                />

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <Loading />

                    <div className="p-6 border-b border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="relative">
                                <div className="flex space-x-4 mt-5">
                                    <button
                                        type="button"
                                        onClick={() => setPreviousTreatment("No")}
                                        className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center ${
                                            previousTreatment === "No"
                                                ? "bg-blue-500 text-white shadow-md hover:bg-blue-600"
                                                : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-100"
                                        }`}
                                    >
                                        <svg 
                                            className={`w-5 h-5 mr-2 ${
                                                previousTreatment === "No" ? "text-blue-100" : "text-blue-500"
                                            }`} 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        New Customer
                                    </button>
                                    
                                    <button
                                        type="button"
                                        onClick={() => setPreviousTreatment("Yes")}
                                        className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center ${
                                            previousTreatment === "Yes"
                                                ? "bg-emerald-500 text-white shadow-md hover:bg-emerald-600"
                                                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-100"
                                        }`}
                                    >
                                        <svg 
                                            className={`w-5 h-5 mr-2 ${
                                                previousTreatment === "Yes" ? "text-emerald-100" : "text-emerald-500"
                                            }`} 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Existing Customer
                                    </button>
                                </div>
                            </div>
                            {previousTreatment === "Yes" && (
                                <div className="relative md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number Search <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="relative flex items-center">
                                            <input
                                                type="tel"
                                                value={phoneSearch}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                    setPhoneSearch(value);
                                                    setSearchResults([]);
                                                    setSelectedCustomer(null);
                                                }}
                                                maxLength={10}
                                                placeholder="Enter 10 digit phone number"
                                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm transition-all duration-200 hover:border-gray-400 pr-12"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                            />
                                            <div className="absolute left-3 text-gray-400">
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <button
                                                onClick={handleSearch}
                                                disabled={!phoneSearch || phoneSearch.length !== 10 || isSearching}
                                                className={`absolute right-0 flex items-center justify-center h-full px-4 text-white rounded-r-lg transition-colors duration-200 ${
                                                    isSearching 
                                                        ? 'bg-green-400' 
                                                        : phoneSearch && phoneSearch.length === 10 
                                                            ? 'bg-green-500 hover:bg-green-600' 
                                                            : 'bg-gray-300 cursor-not-allowed'
                                                }`}
                                            >
                                                {isSearching ? (
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : (
                                                    <>
                                                        <FiSearch className="h-5 w-5" />
                                                        <span className="ml-2 text-sm font-medium hidden sm:inline">Search</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='container'>
                        {searchResults.length > 0 && !selectedCustomer && (
                            <div className="absolute z-20 mt-4 container mx-auto px-4 bg-white shadow-xl rounded-lg border border-gray-100 max-h-80 overflow-auto transition-all duration-200 ease-in-out transform origin-top">
                                {searchResults.map((customer) => (
                                    <div
                                        key={customer.id}
                                        className="p-3.5 hover:bg-blue-50/80 cursor-pointer border-b border-gray-100 last:border-0 transition-all duration-200 ease-in-out group active:scale-[0.98]"
                                        onClick={() => handleSelectCustomer(customer)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors text-[15px]">
                                                {customer.name}
                                            </span>
                                            <span className="text-xs font-bold bg-blue-100/90 text-blue-800 px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm">
                                                <FiPhone className="inline mr-1.5" size={12} />
                                                {customer.phone}
                                            </span>
                                        </div>

                                        <div className="text-sm text-gray-700 mt-1.5 flex items-center group-hover:text-gray-900 transition-colors">
                                            <FiMapPin className="mr-2 flex-shrink-0 text-blue-600/90" size={15} />
                                            <span className="truncate font-medium">
                                                {customer.area}, {customer.district}
                                            </span>
                                        </div>

                                        <div className="flex items-center mt-2 text-xs">
                                            <span className="inline-flex items-center text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                                                <FiCalendar className="mr-1.5 text-blue-600/80" size={12} />
                                                <span className="font-medium">Last:</span> {customer.serviceDate}
                                            </span>
                                            <span className="mx-1.5 text-gray-300">|</span>
                                            <span className="inline-flex items-center text-gray-600 bg-gray-50 px-2 py-1 rounded-md">
                                                <FiTool className="mr-1.5 text-blue-600/80" size={12} />
                                                <span className="font-medium">Service:</span> {customer.serviceType}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Selected customer card */}
                        {selectedCustomer && (
                            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-4 relative transition-all duration-200">
                                <button
                                    onClick={handleClearSelection}
                                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                                    aria-label="Clear selection"
                                >
                                    <FiX className="h-5 w-5" />
                                </button>

                                <div className="flex items-start mb-3">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                        <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-800">{selectedCustomer.name}</h4>
                                        <p className="text-sm text-gray-600">{selectedCustomer.phone}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <div className="bg-white p-2 rounded border border-gray-100">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Area</div>
                                        <div>{selectedCustomer.area}</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-100">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">District</div>
                                        <div>{selectedCustomer.district}</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-100">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Service Type</div>
                                        <div>{selectedCustomer.serviceType}</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-100">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Last Service</div>
                                        <div>{selectedCustomer.serviceDate}</div>
                                    </div>
                                    <div className="bg-white p-2 rounded border border-gray-100">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Amount</div>
                                        <div className="font-medium text-green-600">{selectedCustomer.amount}</div>
                                    </div>
                                    <div className="sm:col-span-2 bg-white p-2 rounded border border-gray-100">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Treatment Details</div>
                                        <div>{selectedCustomer.treatmentDetails}</div>
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={handlePickUpFrom}
                                        className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 active:bg-green-800 active:shadow-inner flex items-center justify-center gap-2"
                                    >
                                        <FiPackage className="text-lg" />
                                        {showFormSections ? "Hide Form" : "Pick up from"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {phoneSearch && !selectedCustomer && (
                            <div className={`mt-2 p-3 rounded-md text-sm flex items-start 
                                ${isSearching ? 'bg-blue-50 border border-blue-100 text-blue-700' : 
                                'bg-yellow-50 border border-yellow-100 text-yellow-700'}`}>
                                
                                {isSearching ? (
                                    <svg className="h-4 w-4 mt-0.5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="h-4 w-4 mt-0.5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                )}
                                
                                {isSearching ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Searching customer records...
                                    </div>
                                ) : (
                                    searchResults.length === 0 && (
                                        <div>
                                            <p className="font-medium">No records found</p>
                                            <p className="text-yellow-600">No previous customer records found for this phone number</p>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                    {(previousTreatment === "No" || showFormSections) && (
                        <>
                            {/* Basic Information Section */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                        <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
                                        Basic Information
                                    </h3>
                                    <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                        Lead ID: <span className="font-semibold text-gray-800">PC-00124</span>
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Customer Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Enter First name"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Enter last name"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Phone <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter phone number"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter email address"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Alternate Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            WhatsApp Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={whatsapp}
                                            onChange={(e) => setWhatsapp(e.target.value)}
                                            placeholder="Enter WhatsApp number"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        />
                                    </div>
                                    <Dropdowns
                                        label="Enquiry Type"
                                        value={enquiryType}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEnquiryType(e.target.value)}
                                        options={[
                                            { value: "Residential", label: "Residential" },
                                            { value: "Commercial", label: "Commercial" },
                                        ]}
                                        searchable={true}
                                    />

                                    {enquiryType === "Residential" && (
                                        <Dropdowns
                                            label="Residential Type"
                                            value={residentialType}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setResidentialType(e.target.value)}
                                            options={[
                                                { value: "", label: "Select residential type" },
                                                { value: "Apartment", label: "Apartment" },
                                                { value: "Villa", label: "Villa" },
                                                { value: "Townhouse", label: "Townhouse" },
                                                { value: "Penthouse", label: "Penthouse" }
                                            ]}
                                            searchable={true}
                                        />
                                    )}

                                    {enquiryType === "Commercial" && (
                                        <Dropdowns
                                            label="Commercial Type"
                                            value={commercialType}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCommercialType(e.target.value)}
                                            options={[
                                                { value: "", label: "Select commercial type" },
                                                { value: "Office", label: "Office" },
                                                { value: "Retail", label: "Retail" },
                                                { value: "Warehouse", label: "Warehouse" },
                                                { value: "Hotel", label: "Hotel" }
                                            ]}
                                            searchable={true}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Property Details Section */}
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                    <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
                                    Property Details
                                </h3>

                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                        <FiMapPin className="mr-2 text-gray-500" />
                                        Address Information
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Street */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Street <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={street}
                                                onChange={(e) => setStreet(e.target.value)}
                                                placeholder="Enter street address"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* Area */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Area <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={area}
                                                onChange={(e) => setArea(e.target.value)}
                                                placeholder="Enter area"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* City */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                City <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder="Enter city"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* State Dropdown */}
                                        <div className="">
                                            <Dropdowns
                                                label="State"
                                                value={state}
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setState(e.target.value)}
                                                options={[
                                                    { value: "Kerala", label: "Kerala" },
                                                    { value: "Tamil Nadu", label: "Tamil Nadu" },
                                                    { value: "Karnataka", label: "Karnataka" },
                                                    { value: "Andhra Pradesh", label: "Andhra Pradesh" }
                                                ]}
                                                searchable={true}
                                            />
                                        </div>

                                        <div className="">
                                            <Dropdowns
                                                label="District"
                                                value={district}
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDistrict(e.target.value)}
                                                options={[
                                                    { value: "Thiruvanathapuram", label: "Thiruvanathapuram" },
                                                    { value: "Kollam", label: "Kollam" },
                                                    { value: "Ernakulam", label: "Ernakulam" },
                                                    { value: "kannur", label: "kannur" }
                                                ]}
                                                searchable={true}
                                            />
                                        </div>

                                        {/* Pincode */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Pincode <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={pincode}
                                                onChange={(e) => setPincode(e.target.value)}
                                                placeholder="Enter pincode"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* Landmark */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Landmark <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={landmark}
                                                onChange={(e) => setLandmark(e.target.value)}
                                                placeholder="Enter landmark"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enquiry Details Section */}
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                    <span className="w-2 h-6 bg-purple-500 rounded-full mr-3"></span>
                                    Enquiry Details
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Enquiry Source */}
                                    <div className="">
                                        <Dropdowns
                                            label="Enquiry Source"
                                            value={enquirySource}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                setEnquirySource(e.target.value);
                                                if (e.target.value !== "Other") setCustomEnquirySource("");
                                            }}
                                            options={[
                                                { value: "Phone", label: "Phone" },
                                                { value: "Email", label: "Email" },
                                                { value: "Website", label: "Website" },
                                                { value: "Walk-in", label: "Walk-in" },
                                                { value: "Other", label: "Other" }
                                            ]}
                                            searchable={true}
                                        />
                                        {enquirySource === "Other" && (
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Specify source"
                                                    value={customEnquirySource}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomEnquirySource(e.target.value)}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Enquiry Category */}
                                    <div className="">
                                        <Dropdowns
                                            label="Enquiry Category"
                                            value={enquiryCategory}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                setEnquiryCategory(e.target.value);
                                                if (e.target.value !== "Other") setCustomEnquiryCategory("");
                                            }}
                                            options={[
                                                { value: "Complaint", label: "Complaint" },
                                                { value: "Request", label: "Request" },
                                                { value: "Feedback", label: "Feedback" },
                                                { value: "Query", label: "Query" },
                                                { value: "Other", label: "Other" }
                                            ]}
                                            searchable={true}
                                        />
                                        {enquiryCategory === "Other" && (
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Specify category"
                                                    value={customEnquiryCategory}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomEnquiryCategory(e.target.value)}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Service Type */}
                                    <div className="">
                                        <Dropdowns
                                            label="Service Type"
                                            value={serviceType}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                setServiceType(e.target.value);
                                                if (e.target.value !== "Other") setCustomServiceType("");
                                            }}
                                            options={[
                                                { value: "CMS", label: "CMS - cockroach management system" },
                                                { value: "Support", label: "Support" },
                                                { value: "Installation", label: "Installation" },
                                                { value: "Maintenance", label: "Maintenance" },
                                                { value: "Other", label: "Other" }
                                            ]}
                                            searchable={true}
                                        />
                                        {serviceType === "Other" && (
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Specify service type"
                                                    value={customServiceType}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomServiceType(e.target.value)}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Urgency */}
                                    <div className="">
                                        <Dropdowns
                                            label="Urgency"
                                            value={urgency}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUrgency(e.target.value)}
                                            options={[
                                                { value: "Low", label: "Low" },
                                                { value: "Medium", label: "Medium" },
                                                { value: "High", label: "High" },
                                                { value: "Critical", label: "Critical" }
                                            ]}
                                            searchable={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information Section */}
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                    <span className="w-2 h-6 bg-amber-500 rounded-full mr-3"></span>
                                    Additional Information
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Property Size */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Property Size <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={propertySize}
                                            onChange={(e) => setPropertySize(e.target.value)}
                                            placeholder="Enter property size"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Number Of Rooms */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Number Of Rooms
                                        </label>
                                        <input
                                            type="text"
                                            value={rooms}
                                            onChange={(e) => setRooms(e.target.value)}
                                            placeholder="Enter number of rooms"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Pest Type */}
                                    <div className="relative">
                                        <Dropdowns
                                            label="Pest Type"
                                            value={pestType}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                setPestType(e.target.value);
                                                if (e.target.value !== "Other") setCustomPestType("");
                                            }}
                                            options={[
                                                { value: "Termites", label: "Termites" },
                                                { value: "Rodents", label: "Rodents" },
                                                { value: "Cockroaches", label: "Cockroaches" },
                                                { value: "Bed Bugs", label: "Bed Bugs" },
                                                { value: "Other", label: "Other" }
                                            ]}
                                            searchable={true}
                                        />
                                        {pestType === "Other" && (
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Specify pest type"
                                                    value={customPestType}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomPestType(e.target.value)}
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Budget Range */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Budget Range
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={budget}
                                                onChange={(e) => setBudget(e.target.value)}
                                                placeholder="Enter budget range"
                                                className="w-full px-4 py-2.5 pl-4 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Preferred Service Date */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Preferred Service Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                value={preferredDate}
                                                onChange={(e) => setPreferredDate(e.target.value)}
                                                className="w-full px-4 py-2.5 pl-4 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                            <FiCalendar className="absolute right-3 top-3.5 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Attend Dropdown */}
                                    <div className="">
                                        <Dropdowns
                                            label="Attend by"
                                            value={attend}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAttend(e.target.value)}
                                            options={[
                                                { value: "", label: "Select option" },
                                                { value: "A", label: "Aswanth" },
                                                { value: "B", label: "ueena" },
                                                { value: "D", label: "meena" },
                                                { value: "U", label: "peena" },
                                                { value: "E", label: "Option 5" },
                                                { value: "F", label: "Option 6" },
                                                { value: "G", label: "Option 7" },
                                                { value: "H", label: "Option 8" },
                                                { value: "I", label: "Option 9" },
                                                { value: "J", label: "Option 10" },
                                            ]}
                                            searchable={true}
                                        />
                                    </div>

                                    {/* Assign Dropdown */}
                                    <div className="">
                                        <Dropdowns
                                            label="Assign to"
                                            value={assign}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAssign(e.target.value)}
                                            options={[
                                                { value: "", label: "Select option" },
                                                { value: "A", label: "Adhithya" },
                                                { value: "B", label: "Banu" },
                                                { value: "E", label: "Option 5" },
                                                { value: "F", label: "Option 6" },
                                                { value: "G", label: "Option 7" },
                                                { value: "H", label: "Option 8" },
                                                { value: "I", label: "Option 9" },
                                                { value: "J", label: "Option 10" },
                                            ]}
                                            searchable={true}
                                        />
                                    </div>

                                    {/* Additional Notes */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Additional Notes
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Enter additional notes"
                                                rows={3}
                                                className="w-full px-4 py-2.5 pl-4 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            ></textarea>
                                            <FiInfo className="absolute right-3 top-3.5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 md:col-span-3 py-2 px-7">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.inspectionNeeded}
                                        onChange={handleCheckboxChange}
                                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-gray-700">Inspection needed</span>
                                </label>
                            </div>

                            {formData.inspectionNeeded ? (
                                <div className="mb-6 p-4 bg-white-50 border border-green-200 rounded-lg md:col-span-3">
                                               <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                                    <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
                                    Inspection Details
                                </h3>
                                <span className="inline-flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2 text-sm border border-gray-200 shadow-xs">
                                    
                                    <span className="h-4 w-px bg-gray-300"></span>
                               
                                </span>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Inspection Date */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Inspection Date <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="inspectionDate"
                                            // value={inspectionData.inspectionDate}
                                            // onChange={handleInspectionChange}
                                            className="w-full px-4 py-2.5 pl-4 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        />
                                        <FiCalendar className="absolute right-3 top-3.5 text-gray-400" />
                                    </div>
                                </div>

                                {/* Inspection Time */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Inspection Time <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        name="inspectionTime"
                                        // value={inspectionData.inspectionTime}
                                        // onChange={handleInspectionChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Inspection Type */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Inspection Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="inspectionType"
                                        // value={inspectionData.inspectionType}
                                        // onChange={handleInspectionChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-no-repeat pr-10"
                                    >
                                        <option value="pre_service">Pre-Service</option>
                                        <option value="technical_assessment">Technical Assessment</option>
                                        <option value="site_survey">Site Survey</option>
                                    </select>
                                </div>

                                {/* Technical Team Lead */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Technical Team Lead <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="technicalTeamLead"
                                        // value={inspectionData.technicalTeamLead}
                                        // onChange={handleInspectionChange}
                                        placeholder="Enter team lead name"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Estimated Duration */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Estimated Duration (hours) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="estimatedDuration"
                                        // value={inspectionData.estimatedDuration}
                                        // onChange={handleInspectionChange}
                                        placeholder="Enter duration in hours"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Inspection Status */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Inspection Status <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="inspectionStatus"
                                        // value={inspectionData.inspectionStatus}
                                        // onChange={handleInspectionChange}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-no-repeat pr-10"
                                    >
                                        <option value="scheduled">Scheduled</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                                
                            </div>
                            
                                </div>
                            ) : (
                                <div className="space-y-4 md:col-span-3">
                                    {/* <h3 className="font-medium text-gray-700">Basic Mandatory Forms</h3> */}
                                </div>
                            )}

                            {isSubmitted && !formData.inspectionNeeded && (
                                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg md:col-span-3">
                        
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className='mt-4 py-4 px-2'> 
                    <FormButtons
                        // onCancel={handleCancel}
                      
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductManagementAdd;