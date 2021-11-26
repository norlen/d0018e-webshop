import Image from "next/image";
import { useUser } from "@lib/hooks";
import { getOrderStatusName } from "@lib/util";
import Select from "@components/order/selectStatus";

const Table = ({ data }: any) => {
  const { user } = useUser();

  return (
    <div className="shadow border-b border-gray-200 sm:rounded-lg min-w-full ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Namn
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Kontakt information
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Kundnummer
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 mb-56">
          {data.map((item: any) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <Image
                      src="/images/profile-default.jpeg"
                      height={40}
                      width={40}
                      className="h-10 w-10 rounded-full"
                      alt="Profile image"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-500">{item.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item.phonenumber}</div>
                <div className="text-sm text-gray-500">{item.address}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user && user.isAdmin ? (
                  <Select currentStatus={item.status} orderId={item.id} />
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {getOrderStatusName(item.status)}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.userid}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a
                  href={"/order/" + item.id}
                  className="text-green-500 hover:text-green-700"
                >
                  Mer Information
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
