import { useState } from 'react';
import {
    FiUser, FiPhone, FiMail, FiPhoneCall,
    FiHome, FiMapPin, FiMap, FiLayers,
    FiCalendar, FiClock, FiAlertTriangle,
    FiCheck, FiX,

} from 'react-icons/fi';

import HeaderDate from '@/pages/components/HeaderDate';
import HeaderComponent from '@/pages/components/HeaderComponent';

function CategoryManagementView() {
    const [isActive, setIsActive] = useState(true);
    const propertyData = {
        id: "PC-00124",
        customerName: 'Aswanth',
        phone: '8304848359',
        email: 'aswanth12@gmail.com',
        alternatePhone: '',
        street: '123 Main St',
        area: 'Downtown',
        city: 'Metropolis',
        state: 'NY',
        pincode: '10001',
        landmark: 'Near Central Park',
        coordinates: '40.7128° N, 74.0060° W',
        propertySize: '379 sqft',
        numberOfRooms: 3,
        pestType: 'Cockroaches',
        infestationLevel: 'Low',
        propertyType: 'Home',
        previousTreatment: 'No',
        urgency: '3 Day',
        preferredServiceDate: '2023-06-15',
        additionalNotes: 'Pet friendly treatment preferred',
        enquiryDate: '27/07/2025',
        enquiryTime: '12:09 PM',
        enquirySource: 'website',
        enquiryCategory: 'new_enquiry',
        serviceType: ['CMS', 'TMS'],
    };

    return (
                   <div className="container mx-auto bg-gray-150 border-b border-gray-200">
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
                    title="Enquiry View"
                    breadcrumb="Dashboard / Enquiry / View"
                    className="mb-4"
                    showBackButton={true}
                    showAddButton={false}

                />

                {/* Main Content - Full Width */}
                <div className=" container mx-auto px- ">

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-0">
                        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
                            <div className="flex items-center">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {isActive ? (
                                        <>
                                            <FiCheck className="mr-1.5 h-4 w-4" /> Active
                                        </>
                                    ) : (
                                        <>
                                            <FiX className="mr-1.5 h-4 w-4" /> Inactive
                                        </>
                                    )}
                                </span>
                                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                    Lead ID: <span className="font-semibold text-gray-800">PC-00124</span>
                                </span>
                            </div>
                            <button
                                onClick={() => setIsActive(!isActive)}
                                className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${isActive
                                        ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500'
                                        : 'border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                                    }`}
                            >
                                {isActive ? 'Deactivate Lead' : 'Activate Lead'}
                            </button>
                        </div>

                        {/* Customer Quick Info */}
                        <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <FiUser className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">{propertyData.customerName}</h3>
                                    <p className="text-sm text-gray-500">{propertyData.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <FiPhone className="h-5 w-5 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">{propertyData.phone}</h3>
                                    <p className="text-sm text-gray-500">{propertyData.alternatePhone || 'No alternate phone'}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                    <FiHome className="h-5 w-5 text-purple-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-medium text-gray-900">{propertyData.propertyType}</h3>
                                    <p className="text-sm text-gray-500">{propertyData.city}, {propertyData.state}</p>
                                </div>
                            </div>
                        </div>

                        {/* Main Content - Full Width Sections */}
                        <div className="p-6 space-y-6">
                            {/* Basic Information - Full Width Row */}
                            <SectionCard
                                title="Basic Information"
                                icon={<FiUser className="h-5 w-5 text-blue-600" />}
                                fullWidth
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <InfoRow icon={<FiUser />} label="Customer Name" value={propertyData.customerName} />
                                    <InfoRow icon={<FiPhone />} label="Phone" value={propertyData.phone} />
                                    <InfoRow icon={<FiMail />} label="Email" value={propertyData.email} />
                                    <InfoRow icon={<FiPhoneCall />} label="Alternate Phone" value={propertyData.alternatePhone || 'N/A'} />
                                </div>
                            </SectionCard>

                            {/* Service Information - Full Width Row */}
                            <SectionCard
                                title="Service Information"
                                icon={<FiAlertTriangle className="h-5 w-5 text-orange-600" />}
                                fullWidth
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <InfoRow label="Pest Type" value={propertyData.pestType} />
                                    <InfoRow label="Infestation Level" value={propertyData.infestationLevel} />
                                    <InfoRow label="Property Type" value={propertyData.propertyType} />
                                    <InfoRow label="Property Size" value={propertyData.propertySize} />
                                    <InfoRow label="Number of Rooms" value={propertyData.numberOfRooms} />
                                    <InfoRow label="Previous Treatment" value={propertyData.previousTreatment} />
                                    <InfoRow label="Urgency" value={propertyData.urgency} />
                                    <InfoRow label="Preferred Service Date" value={propertyData.preferredServiceDate} />
                                </div>
                                <div className="mt-4">
                                    <InfoRow label="Additional Notes" value={propertyData.additionalNotes} />
                                </div>
                            </SectionCard>

                            {/* Property Information - Full Width Row */}
                            <SectionCard
                                title="Property Information"
                                icon={<FiHome className="h-5 w-5 text-indigo-600" />}
                                fullWidth
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <InfoRow icon={<FiMapPin />} label="Street" value={propertyData.street} />
                                    <InfoRow icon={<FiMap />} label="Area" value={propertyData.area} />
                                    <InfoRow icon={<FiMap />} label="City/State" value={`${propertyData.city}, ${propertyData.state}`} />
                                    <InfoRow icon={<FiLayers />} label="Pincode" value={propertyData.pincode} />
                                    <InfoRow icon={<FiLayers />} label="Landmark" value={propertyData.landmark} />
                                    <InfoRow icon={<FiLayers />} label="Coordinates" value={propertyData.coordinates} />
                                </div>
                            </SectionCard>

                            {/* System Information - Full Width Row */}
                            <SectionCard
                                title="System Information"
                                icon={<FiClock className="h-5 w-5 text-green-600" />}
                                fullWidth
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <InfoRow icon={<FiCalendar />} label="Enquiry Date" value={propertyData.enquiryDate} />
                                    <InfoRow icon={<FiClock />} label="Enquiry Time" value={propertyData.enquiryTime} />
                                    <InfoRow label="Enquiry Source" value={propertyData.enquirySource} />
                                    <InfoRow label="Enquiry Category" value={propertyData.enquiryCategory} />
                                    <InfoRow label="Service Type" value={propertyData.serviceType.join(', ')} />
                                </div>
                            </SectionCard>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Updated Section Card Component with fullWidth prop
const SectionCard = ({ title, icon, children, fullWidth = false }: {
    title: string,
    icon: React.ReactNode,
    children: React.ReactNode,
    fullWidth?: boolean
}) => (
    <div className={`bg-white rounded-lg shadow-xs border border-gray-200 overflow-hidden ${fullWidth ? 'w-full' : ''}`}>
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 flex items-center">
            {icon}
            <h3 className="ml-2 text-lg font-medium text-gray-900">{title}</h3>
        </div>
        <div className="px-5 py-4">
            {children}
        </div>
    </div>
);

// InfoRow component remains the same
const InfoRow = ({ icon, label, value }: { icon?: React.ReactNode, label: string, value: string | number | undefined }) => (
    <div className="flex items-start">
        {icon && (
            <span className="mr-3 mt-0.5 flex-shrink-0 text-gray-400">
                {icon}
            </span>
        )}
        <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="mt-1 text-sm font-semibold text-gray-900 break-words">
                {value || <span className="text-gray-400">Not provided</span>}
            </p>
        </div>
    </div>
);

export default CategoryManagementView;