import { useContext } from "react";
import { ContentContext } from "../../context/globalContext";
import LoadingSpinner from "../../components/common/Loading";

const CustomerAdmin = () => {
    const { content, isLoading, refetch } = useContext(ContentContext);
    const customerInfo = content?.customers || [];

    if (isLoading) {
        return <LoadingSpinner />;
    }
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };
    
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Customer Information
                    </h1>
                    <p className="text-gray-600 mt-1">
                        View customer information details.
                    </p>
                </div>
            </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Registered At
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tickets
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {customerInfo.map((customer, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {customer?.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a 
                                                className="text-sm font-medium text-neutral-600 hover:text-neutral-800"
                                                href={`mailto:${customer.email}`}
                                            >
                                                {customer.email}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a className="text-sm text-gray-600"
                                                href={`tel:${customer.phone}`}
                                            >
                                                {customer.phone}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {formatTime(customer.registeredAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {customer.tickets?.length || 0}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
};

export default CustomerAdmin;
