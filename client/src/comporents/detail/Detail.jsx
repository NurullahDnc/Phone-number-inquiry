import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useForm } from "react-hook-form";
import Textarea from "../general/Textarea";
import Select from "../general/Select";
import Button from "../general/Button";
import HeadingTitle from "../general/HeadingTitle";
import Comment from "./Comment";
import ReactPaginate from "react-paginate";
import Faq from "../general/Faq";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import MetaTags from "../general/MetaTags";
import { FaTimes } from "react-icons/fa";
import Breadcrumbs from "../general/Breadcrumbs";


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

  const { PhoneNumberUtil } = require('google-libphonenumber');
  const phoneNumberUtil = PhoneNumberUtil.getInstance();
  const [phoneNumberInfo, setPhoneNumberInfo] = useState(null);

  const phoneNumbers = `+${id.trim()}`;



  //db number getiriyor, params.id karsılastırıp numaranın id buluyor, alta numara id gore yorumları getiriyor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/number`);
        //istenilen telefon numarayı bul
        const findNumber = res.data.data.find((item) => item.number == id);
        setPhoneNumber(findNumber)

        //telefon numarası varsa telefon numarasını  gonder yoksa id gonder
        setSelectedPhone(findNumber && findNumber.number ? findNumber.number : id);

        // if (findNumber) {
        //   const comments = await axios.get(`${process.env.REACT_APP_BASE_URL}/comment/${findNumber._id}`);
        //   setCommentList(comments.data.data);
        // } else {
        //   // console.error("Numara bulunamadı veya tanımsız");
        // }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };

    fetchData();
  }, [id]);



  useEffect(() => {
    const fetchData = async () => {
      try {

        if (phoneNumber) {
          //telefon numarasına gore yorumları getir
          const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/comment/${id}`);
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
  }, [selectedPhone, commentList]);


  const handleCreate = async (data) => {
    // Yorum verisi oluşturulur
    let commentData = {
      number: selectedPhone,
      comment: data.comment,
      status: data.status,
    };

    // Eğer filtre ülke seçilmişse, yorum verisine ülke bilgisi eklenir
    commentData.countryName = phoneNumberInfo?.country == undefined ? "Belirsiz" : phoneNumberInfo?.country;
    commentData.countryCode = phoneNumberInfo?.countryCode;

    try {
      // Yorum verisi API'ye gönderilir
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/comment/create`, commentData);
      toast.success(res.data.message);

      setValue('comment', '');

      // Güncel veri yeniden getirilir
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/comment/${id}`);
        setCommentList(res.data.data)

      } catch (error) {
        console.error(error);
      }

    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
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
        const res1 = await axios.get("https://restcountries.com/v2/all");
        const res2 = await axios(`${process.env.REACT_APP_BASE_URL}/country`);
        const mergedData = [...res1.data, ...res2.data.data];

        setCountryList(mergedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [commentList]);

  useEffect(() => {
    try {
      const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(phoneNumbers, 'TR');
      const countryCode = parsedPhoneNumber.getCountryCode();
      const regionCode = phoneNumberUtil.getRegionCodeForNumber(parsedPhoneNumber);
      if (regionCode === 'AR') {
        const turkey = countryList.find(country => country.alpha2Code === 'TR');
        // Telefon numarasının ülke bilgisini phoneNumberInfo state'ine kaydet
        setPhoneNumberInfo({
          countryCode: turkey.callingCodes[0], // Türkiye'nin ülke kodu
          regionCode: 'TR',
          country: turkey.name
        });
      } else {
        let foundCountry;
        if (regionCode) {
          foundCountry = countryList.find(country => country.alpha2Code === regionCode);
        } else {
          foundCountry = countryList.find(country => country.callingCodes.includes(countryCode));
        }

        // Telefon numarasının ülke bilgisini phoneNumberInfo state'ine kaydet          
        setPhoneNumberInfo({
          countryCode,
          regionCode,
          country: foundCountry ? foundCountry.name : "Belirsiz" // Eğer ülke bulunamazsa "Belirsiz" olarak ayarla
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [phoneNumber, countryList]);





  //*-------------------- react-paginate (sayfa sınırlandırma)

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const comments = commentList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(commentList.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % commentList.length;

    setItemOffset(newOffset);
  };

  //*-------------------- react-paginate (sayfa sınırlandırma)


  const seeCount = 2;

  const dataBreadcrumbs = [
    { page1: 'Ana Sayfa', url1: '/', page2: "Numaralar", url2: '/telefon-numarasi/:id', page3: id, url3: '/', },

  ];

  const num = { "num": id }

  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios(`${process.env.REACT_APP_BASE_URL}/seo/detail`);
        const mergedData = [...res.data.data, num];

        setData(mergedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>

      {
        data.map((item, i) => (
          <MetaTags
          key={i}
            title={item.num}
            description={item.description}
            keywords={item.keywords}

          />
        ))
      }

      <div className=" text-center py-8 flex justify-center items-center">

        <h1 className="font-bold text-2xl dark:text-gray-400">
          Telefon Numarası:{" "}
        </h1>{" "}
        <span className="text-2xl font-semibold px-3 dark:text-gray-100 "> {id} </span>
      </div>
      <div className="w-full md:flex md:px-5  ">
        <div className="shadow-lg mb-7 flex bg-red-600 rounded-lg justify-center items-center w-full md:w-1/5 h-[250px] md:h-[500px] dark:bg-gray-800 ">
          Ads
        </div>

        <div className=" w-full md:w-3/4 px-3   ">
          <div className="bg-white px-5 md:px-12 dark:bg-gray-600 py-5 ">
            {dataBreadcrumbs.map((item, index) => (
              <Breadcrumbs key={index} page1={item.page1} url1={item.url1} page2={item.page2} ur2l={item.url2} page3={item.page3} ur3={item.url3} />
            ))}

            <HeadingTitle light title={`${id} Telefon Numarasının İstatislikleri`} />
            {commentData.map((item, i) => (
              <Table key={i} title={item.title} text={item.value} />
            ))}
          </div>

          {/* <p className="py-3 indent-3 text-lg dark:text-gray-300 ">
            05425972258 Veritabanımızda bu telefon numarasına ait 2 yorum bulunmaktadır. Telefon numarasının veritabanımızdaki yorumlara göre ortalama puanı Belirsiz'dir. 2 Kullanıcı bu telefon numarasına 1 Tehlikeli, 1 Güvenli, puana sahip yorum yapmıştır.
          </p> */}

          <div className="my-5">
            <HeadingTitle
              title={`${id} Numarası hakkında bizi bilgilendirin`}
              light
            />

            <form className="bg-gray-50 dark:bg-gray-600 rounded-md p-3 md:p-5" onSubmit={handleSubmit(handleCreate)}>
              <Textarea
                id="comment"
                type="text"
                placeholder={`${id} numarasi ile ilgili yorum yazın... `}
                rows={9}
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

          <div className="w-full h-52 bg-red-600 rounded-lg shadow-lg flex justify-center items-center dark:bg-gray-800 ">
            Ads
          </div>


          <div className="   bg-gray-100 my-5 rounded-lg dark:bg-gray-600 ">
            <div className="pb-3 pl-5">
              <HeadingTitle xSmall title={`${selectedPhone} Numaranın Yorumları`} />

            </div>
            {comments.length > 0 ? (
              comments.map((item, i) => (
                <Comment
                  key={i}
                  id={item._id}
                  number={item.number?.number}
                  country={item.number?.countryName}
                  status={item.status}
                  comment={item.comment}
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

          <div className="mb-7">
            <Faq count={"3"} seeCount={seeCount} btn />

          </div>
        </div>

        <div className="shadow-lg mb-7 flex bg-red-600 rounded-lg justify-center items-center w-full md:w-1/5 h-[250px] md:h-[500px] dark:bg-gray-800 ">
          Ads
        </div>
      </div>
    </div>
  );
};

export default Detail;
