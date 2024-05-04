import React from 'react';

const Table = ({ title, text }) => {
    return (
        <div className="relative overflow-x-auto  rounded-md  ">
            <table className="w-full text-sm text-left p-5 rtl:text-right text-gray-500 dark:text-gray-400" style={{ borderCollapse: 'collapse' }}>
                <tbody>
                    <tr className="border-b w-full  dark:bg-gray-800  dark:border-gray-700 mb-5">

                        <th scope="row" className=" w-2/3  py-7 text-[16px] text-gray-900 font-semibold dark:text-white ">
                            {title}:
                        </th>
                        <td className=" w-1/3 text-[16px] text-center py-4 mr-auto font-semibold text-gray-900 ">
                            {text}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Table;
