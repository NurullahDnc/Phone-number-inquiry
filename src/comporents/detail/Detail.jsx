import React, { useEffect, useState } from 'react'
import Table from './Table'
import { useForm } from 'react-hook-form';
import Textarea from '../general/Textarea';
import Select from '../general/Select';
import Button from '../general/Button';
import HeadingTitle from '../general/HeadingTitle';
import Comment from '../general/Comment';
import ReactPaginate from 'react-paginate';
import Faq from '../faq/Faq';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';





const Detail = () => {

  const [comdata, setComData] = useState([
    { title: "Yorum Sayısı", value: 15550 },
    { title: "Belirsiz Yorum Sayısı", value: 15550 },
    { title: "Tehlikeli Yorum Sayısı", value: 15550 },
    { title: "Ülke", value: "Türkey" },
  ]);

  const [data , setdata] = useState([])

  const uncertain = data.filter((item)=> item.status === "uncertain" )
  const trustworthy = data.filter((item)=> item.status === "trustworthy" )
  const dangerous = data.filter((item)=> item.status === "dangerous" )


  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/comment`);
        setdata(res.data.data)
        console.log("res", res.data.data);

        
        const valueFromResponse = res.data.value; // Örneğin, gelen verinin içinde "value" adında bir anahtar varsa
        setComData(prevData => prevData.map(item => ({ ...item, value: valueFromResponse })));
      } catch (error) {
        console.log(error);

      }
    }
 
    fetchData()
  }, [])

  const handleClick = async (data) => {
     const datas = {
      "number": id,
      "comment": data.comment,
      "status": data.status,
      "countryName": "Tr",
      "countryCode": "52"
    }
     try {
      const res = await axios.post("http://localhost:5000/comment/create", datas);
      toast.success(res.data.message);
     } catch (error) {
      toast.error(error.response.data);
      console.log("hata", error);
    }
  }

  const seleted = [
    { value: 'uncertain', label: 'Belirsiz' },
    { value: 'dangerous', label: 'Tehlikeli' },
    { value: 'trustworthy', label: 'Güvenilir' }
  ];

  const exampleComments = [
    {
      id: "1",
      number: '543452652',
      country: 'Turkey',
      status: 'dangerous',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, earum. Rem hic minus doloremque voluptas praesentium asperiores soluta cupiditate aperiam animi optio, maiores pariatur doloribus eligendi, similique in modi explicabo.'
    },
    {
      id: "2",
      number: '1234567890',
      country: 'USA',
      status: 'trustworthy',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: "3",
      number: '9876543210',
      country: 'UK',
      status: 'uncertain',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: "4",
      number: '5555555555',
      country: 'Germany',
      status: 'dangerous',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
    }, {
      id: "5",
      number: '543452652',
      country: 'Turkey',
      status: 'dangerous',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, earum. Rem hic minus doloremque voluptas praesentium asperiores soluta cupiditate aperiam animi optio, maiores pariatur doloribus eligendi, similique in modi explicabo.'
    },
    {
      id: "6",
      number: '1234567890',
      country: 'USA',
      status: 'trustworthy',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: "7",
      number: '9876543210',
      country: 'UK',
      status: 'uncertain',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: "8",
      number: '5555555555',
      country: 'Germany',
      status: 'dangerous',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
    }
  ];



  //*-------------------- react-paginate (sayfa sınırlandırma)

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const comments = exampleComments.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(exampleComments.length / itemsPerPage);


  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % exampleComments.length;
   
    setItemOffset(newOffset);
  };

  //*-------------------- react-paginate (sayfa sınırlandırma)

  return (
    <div>
      <div className=' text-center py-8 flex justify-center items-center'>
        <h1 className='font-bold text-2xl dark:text-gray-400'>Telefon Numarası: </h1> <span className='text-2xl px-3 dark:text-gray-100 '> {id} </span>
      </div>
      <div className='w-full md:flex '>

        <div className=' w-full md:w-3/4 px-3 md:mx-12 '>

          {
            comdata.map((item, i) => (
              <Table title={item.title} text={item.value} />

            ))
          }

          <p className='py-3 indent-3 text-lg dark:text-gray-300 '>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis qui eius adipisci enim aut aliquid fugit repellendus dolorem laboriosam temporibus. Laboriosam repudiandae consequatur consectetur voluptate quae earum. Nemo, qui voluptate.
          </p>


          <div className='my-5'>

            <HeadingTitle title={`${id} Numarası hakkında bizi bilgilendirin`} small />

            <form onSubmit={handleSubmit(handleClick)}  >
              <Textarea id="comment" type="text" placeholder={`${id} Numarası İle Yorum Yazınız `} rows={7} register={register} errors={errors} required />

              <div className='flex justify-between items-center'>
                <Select id={"status"} option={seleted} register={register} errors={errors} required />
                
                <Button btnText={"Yorum Yap"} />

              </div>
            </form>

          </div>

          <div className='w-full h-52 shadow-lg flex justify-center items-center '>
            Ads
          </div>

          <div>
            {
              comments.map((item, i) => (

                <Comment
                  id={item.id}
                  number={item.number}
                  country={item.country}
                  status={item.status}
                  description={item.description}
                />

              ))
            }

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

          <Faq />
            
        </div>



        <div className='shadow-lg flex justify-center items-center w-full md:w-1/5 h-[250px] md:h-[500px] '>
          Ads
        </div>
      </div>
    </div>
  )
}

export default Detail
