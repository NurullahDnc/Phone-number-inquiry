import React from 'react';

const Table = ({ title, text }) => {
    return (
        <div className="relative overflow-x-auto shadow-xl rounded-md  ">
            <table className="w-full text-sm text-left p-5 rtl:text-right text-gray-500 dark:text-gray-400" style={{ borderCollapse: 'collapse' }}>
                <tbody>
                    <tr className="border-b w-full  dark:bg-gray-800 dark:border-gray-700 mb-5">
                        <th scope="row" className=" w-2/3 px-6 py-7 text-lg font-medium text-gray-900 dark:text-white">
                            {title}:
                        </th>
                        <td className=" w-1/3 text-lg text-center py-4 mr-auto ">
                            {text}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
