import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useForm } from "react-hook-form";
import Textarea from "../general/Textarea";
import Select from "../general/Select";
import Button from "../general/Button";
import HeadingTitle from "../general/HeadingTitle";
import Comment from "../general/Comment";
import ReactPaginate from "react-paginate";
import Faq from "../faq/Faq";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { authToken } from "../../util/secret";

const Detail = () => {
  const [commentData, setCommentData] = useState([
    { title: "Yorum Sayısı", value: 0 },
    { title: "Belirsiz Yorum ", value: 0 },
    { title: "Tehlikeli Yorum", value: 0 },
    { title: "Güvenilir Yorum", value: 0 },
    { title: "Son Yorum Tarihi", value: 0 },
    { title: "Konum", value: "" },
  ]);

  const [selectedPhone, setSelectedPhone] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
  const { id } = useParams();
  const [countryList, setCountryList] = useState();
  const [filterCountry, setFilterCountry] = useState();




  //db number getiriyor, params.id karsılastırıp numaranın id buluyor, alta numara id gore yorumları getiriyor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/number`);
        //istenilen numarayı bul
        const findNumber = res.data.data.find((item) => item.number == id);
        setPhoneNumber(findNumber)


        // Eğer findNumber.number varsa, onu state at, yoksa params.id'yi at
        // setSelectedPhone(findNumber?.number ?? id);
        setSelectedPhone(findNumber && findNumber.number ? findNumber.number : id);

        console.log("finnum");


        if (findNumber) {
          const comments = await axios.get(`http://localhost:5000/comment/${findNumber._id}`);
          setCommentList(comments.data.data);
        } else {
          // console.error("Numara bulunamadı veya tanımsız");
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };

    fetchData();
  }, [id]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedPhone) {
          return; // selectedPhone null ise, işlemi durdur
        }

        if (phoneNumber) {
          const res = await axios.get(`http://localhost:5000/comment/${phoneNumber._id}`);
          setCommentList(res.data.data)

          //yorum bilgilerini state atıyoruz, yorum adet alıyoruz, uste de data state yorumlaı atıyoruz
          setCommentData([
            { title: "Yorum Sayısı", value: res.data.data?.length || 0 },
            { title: "Belirsiz Yorum ", value: res.data.data.filter((item) => item.status === "uncertain")?.length || 0 },
            { title: "Tehlikeli Yorum", value: res.data.data?.filter(item => item.status === "dangerous")?.length || 0 },
            { title: "Güvenilir Yorum", value: res.data.data.filter((item) => item.status === "trustworthy")?.length || 0 },
            { title: "Son Yorum Tarihi", value: res.data.data?.length > 0 ? res.data.data[0].createdAt : "Yorum bulunamadı" },
            { title: "Konum", value: res.data.data[0]?.number.countryName || "" }
          ]);

        }


      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedPhone]);


  const handleClick = async (data) => {

    const commentData = {
      number: selectedPhone,
      comment: data.comment,
      status: data.status,
      countryName: filterCountry?.name,
      countryCode: filterCountry?.callingCodes[0],
    };
    try {
      const res = await axios.post("http://localhost:5000/comment/create", commentData);
      toast.success(res.data.message);

      setValue('comment', '');

      //güncel veri getirme
      try {
        const res = await axios.get(`http://localhost:5000/comment/${phoneNumber._id}`);
        setCommentList(res.data.data)
      } catch (error) {
        console.log("yorum yuklenmedi:", error);
      }

    } catch (error) {
      toast.error(error.response.data);
      toast.error(error.response.data.error);
      console.log("hata", error);
    }
  };

  const seleted = [
    { value: "uncertain", label: "Belirsiz" },
    { value: "dangerous", label: "Tehlikeli" },
    { value: "trustworthy", label: "Güvenilir" },
  ];



  //telefon numarasına gore ulke kodunu getiriyor ulke koduna gore ulke biligisini alıyorum.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v2/all");
        setCountryList(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleLookup = async () => {
      try {
        const encodedAuthToken = btoa(authToken); // Kullanıcı adı ve parolayı base64 ile kodla

        const response = await axios.get(`https://lookups.twilio.com/v2/PhoneNumbers/+${id}`, {
          headers: {
            'Authorization': `Basic ${encodedAuthToken}`
          }
        });

        const filterCountrys = countryList.find((item) => item.alpha2Code === response.data.country_code);

        setFilterCountry(filterCountrys)

      } catch (error) {
        console.error("Error fetching country information:", error);
      }
    };

    handleLookup();
  }, [countryList]);



  //*-------------------- react-paginate (sayfa sınırlandırma)

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const comments = commentList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(commentList.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % commentList.length;

    setItemOffset(newOffset);
  };

  //*-------------------- react-paginate (sayfa sınırlandırma)

  return (
    <div>
      <div className=" text-center py-8 flex justify-center items-center">
        <h1 className="font-bold text-2xl dark:text-gray-400">
          Telefon Numarası:{" "}
        </h1>{" "}
        <span className="text-2xl px-3 dark:text-gray-100 "> {id} </span>
      </div>
      <div className="w-full md:flex md:px-5  ">
        <div className=" w-full md:w-3/4 px-3 md:mx-5 ">
          {commentData.map((item, i) => (
            <Table key={i} title={item.title} text={item.value} />
          ))}

          {/* <p className="py-3 indent-3 text-lg dark:text-gray-300 ">
            05425972258 Veritabanımızda bu telefon numarasına ait 2 yorum bulunmaktadır. Telefon numarasının veritabanımızdaki yorumlara göre ortalama puanı Belirsiz'dir. 2 Kullanıcı bu telefon numarasına 1 Tehlikeli, 1 Güvenli, puana sahip yorum yapmıştır.
          </p> */}

          <div className="my-5">
            <HeadingTitle
              title={`${id} Numarası hakkında bizi bilgilendirin`}
              small
            />

            <form onSubmit={handleSubmit(handleClick)}>
              <Textarea
                id="comment"
                type="text"
                placeholder={`${id} Numarası İle Yorum Yazınız `}
                rows={7}
                register={register}
                errors={errors}
                required
              />

              <div className="flex justify-between items-center">
                <Select
                  id={"status"}
                  option={seleted}
                  register={register}
                  errors={errors}
                  required
                />

                <Button btnText={"Yorum Yap"} />
              </div>
            </form>
          </div>

          <div className="w-full h-52 shadow-lg flex justify-center items-center dark:bg-gray-800 ">
            Ads
          </div>

          <div>

            {comments.length > 0 ? (
              comments.map((item, i) => (
                <Comment
                  key={i}
                  id={item._id}
                  number={item.number?.number}
                  country={item.number?.countryName}
                  status={item.status}
                  description={item.comment}
                />
              ))
            ) : (
              <p className="w-full py-6 text-center text-2xl ">Yorum bulunamadı.</p>
            )}

            <ReactPaginate
              className="paginate dark:text-white"
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

        <div className="shadow-lg flex justify-center items-center w-full md:w-1/5 h-[250px] md:h-[500px] dark:bg-gray-800 ">
          Ads
        </div>
      </div>
    </div>
  );
};

export default Detail;
