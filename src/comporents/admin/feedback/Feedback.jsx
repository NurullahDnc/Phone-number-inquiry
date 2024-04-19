import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiTwotoneDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';


const Feedback = () => {

  const [data, setData] = useState([]);
  const [commentId, setCommentId] = useState({});

  useEffect(() => {
    data.map((item) => {
      setCommentId(item.comment?._id);
    });
  }, [data]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios('http://localhost:5000/commentFeedback');
        setData(res.data.data)
       } catch (error) {
        console.log(error);

      }
    }
    fetchData()
  }, [])


  //*-------------------- react-paginate (sayfa sınırlandırma)

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const datas = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    
    setItemOffset(newOffset);
  };

  //*-------------------- react-paginate (sayfa sınırlandırma)

  const handleDelete = async (id) => {
    //yorum ve geri bilidiirmi siliyor
    try {
      const res = await axios.delete(`http://localhost:5000/comment/delete/${commentId}`)

      toast.success(res.data.message)
      await axios.delete(`http://localhost:5000/commentFeedback/delete/${id}`)

    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <div>


      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

              <th scope="col" class="px-6 py-3">
                Adı Soyad
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Acıklama
              </th>
              <th scope="col" class="px-6 py-3">
                Numara
              </th>
              <th scope="col" class="px-6 py-3">
                Numara Yorum
              </th>
              <th scope="col" class="px-6 py-3">
                Durumu
              </th>
              <th scope="col" class="px-6 py-3">
                Yorumu Sil
              </th>
            </tr>
          </thead>
          <tbody>
            {
              datas.map((item) => (
                <tr key={item?._id} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td class="px-6 py-4">
                    {item.surname}
                  </td>
                  <td class="px-6 py-4">
                    {item.mail}
                  </td>
                  <td class="px-6 py-4">
                    {item.description}
                  </td>

                  <td class="px-6 py-4">
                    {item.comment?.number}
                  </td>
                  <td class="px-6 py-4">
                    {item.comment?.comment}
                  </td>

                  <td class="px-6 py-4">
                    {item.comment?.status === "uncertain" ? "Belirsiz" : item.comment?.status === "trustworthy" ? "Güvenilir" : "Tehlikeli"}
                  </td>

                  <td class="px-6 py-4" onClick={() => handleDelete(item._id)}>
                    <a href="#" class="font-medium text-red-800 dark:text-blue-500 hover:underline"> <AiTwotoneDelete size={25} /> </a>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
        <ReactPaginate
          className='paginate dark:text-white'
          breakLabel="..."
          nextLabel="  >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<  "
          renderOnZeroPageCount={null}
        />
      </div>

    </div>
  )
}

export default Feedback

