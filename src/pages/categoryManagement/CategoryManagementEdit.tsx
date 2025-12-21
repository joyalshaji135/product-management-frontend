import { useState } from 'react';

// import FilterButton from '../components/FilterButton';
// import ExportButton from '../components/ExportButton';
import HeaderDate from '@/pages/components/HeaderDate';
import HeaderComponent from '@/pages/components/HeaderComponent';
import FormButtons from '@/pages/components/FormButtons';
import { FiMapPin, FiChevronRight, FiCalendar, FiDollarSign, FiInfo } from 'react-icons/fi';

function CategoryManagementEdit() {
    const [state, setState] = useState("Kerala");
    const [enquirySource, setEnquirySource] = useState("Phone");
    const [enquiryCategory, setEnquiryCategory] = useState("Complaint");
    const [serviceType, setServiceType] = useState("CMS");
    const [urgency, setUrgency] = useState("Low");
    const [pestType, setPestType] = useState("");
    const [previousTreatment, setPreviousTreatment] = useState("");

    return (
        <>
                     <div className="container mx-auto bg-gray-150  border-b border-gray-200">
<div className=" flex items-center justify-between bg-gray-150 p-4">
    <h2 className="text-xl font-bold text-black-800 flex items-center">
        <span className="text-gray-600 text-[18px] mr-2">Lead Management</span>
    </h2>
    <div className="flex items-center space-x-2">
        <HeaderDate />
     
    </div>
</div>

                <div className="container mx-auto px-2">
                    <HeaderComponent
                        title="Enquiry Edit"
                        breadcrumb="Dashboard / Enquiry / Edit"
                        className="mb-4"
                        showBackButton={true}
                        showAddButton={false}

                    />


                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Basic Info Section */}
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
                                        Customer Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter customer name"
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
                                        placeholder="Enter phone number"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Enter email address"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Alternate Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Alternate Phone
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Enter alternate phone"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    />
                                </div>
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
                                            placeholder="Enter city"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* State Dropdown */}
                                    <div className="relative">
                                        <label className="block text-sm text-gray-700 font-medium mb-1">
                                            State <span className="text-red-500">*</span>
                                        </label>

                                        <select
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-no-repeat pr-10"
                                        >
                                            <option value="Kerala">Kerala</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                        </select>

                                        {/* Dropdown Icon */}
                                        <div className="pointer-events-none absolute inset-y-0 top-6 right-3 flex items-center text-gray-500">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>




                                    {/* Pincode */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Pincode <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
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
                                            placeholder="Enter landmark"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Coordinates */}
                                    <div className="relative">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Coordinates <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Enter coordinates"
                                                className="w-full px-4 py-2.5 pl-4 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                            />
                                            <FiMapPin className="absolute right-3 top-3.5 text-gray-400" />
                                        </div>
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
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Enquiry Source <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={enquirySource}
                                        onChange={(e) => setEnquirySource(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-no-repeat pr-10"
                                    >
                                        <option>Phone</option>
                                        <option>Email</option>
                                        <option>Website</option>
                                        <option>Walk-in</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 top-6 right-3 flex items-center text-gray-500">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Enquiry Category */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Enquiry Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={enquiryCategory}
                                        onChange={(e) => setEnquiryCategory(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-no-repeat pr-10"
                                    >
                                        <option>Complaint</option>
                                        <option>Request</option>
                                        <option>Feedback</option>
                                        <option>Query</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 top-6 right-3 flex items-center text-gray-500">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Service Type */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Service Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={serviceType}
                                        onChange={(e) => setServiceType(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-no-repeat pr-10"
                                    >
                                        <option>CMS</option>
                                        <option>Support</option>
                                        <option>Installation</option>
                                        <option>Maintenance</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 top-6 right-3 flex items-center text-gray-500">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Urgency */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Urgency <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={urgency}
                                        onChange={(e) => setUrgency(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-no-repeat pr-10"
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                        <option>Critical</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 top-6 right-3 flex items-center text-gray-500">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
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
                                        placeholder="Enter number of rooms"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Pest Type */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Pest Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={pestType}
                                        onChange={(e) => setPestType(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-no-repeat pr-10"
                                    >
                                        <option value="">Select pest type</option>
                                        <option value="Termites">Termites</option>
                                        <option value="Rodents">Rodents</option>
                                        <option value="Cockroaches">Cockroaches</option>
                                        <option value="Bed Bugs">Bed Bugs</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 top-6 right-3 flex items-center text-gray-500">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Previous Treatment */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Previous Treatment <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={previousTreatment}
                                        onChange={(e) => setPreviousTreatment(e.target.value)}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-no-repeat pr-10"
                                    >
                                        <option value="">Select option</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 top-6 right-3 flex items-center text-gray-500">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Previous Treatment Details */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Previous Treatment Details
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter treatment details"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                    />
                                </div>

                                {/* Budget Range */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Budget Range
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
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
                                            className="w-full px-4 py-2.5 pl-4 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        />
                                        <FiCalendar className="absolute right-3 top-3.5 text-gray-400" />
                                    </div>
                                </div>

                                {/* Additional Notes */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Additional Notes
                                    </label>
                                    <div className="relative">
                                        <textarea
                                            placeholder="Enter additional notes"
                                            rows={3}
                                            className="w-full px-4 py-2.5 pl-4 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                                        ></textarea>
                                        <FiInfo className="absolute right-3 top-3.5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
<FormButtons />
                </div>
            </div>

        </>
    )
}

export default CategoryManagementEdit