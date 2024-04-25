import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeadingTitle from '../general/HeadingTitle';
import Informations from '../information/information';

const Information = () => {
  const { PhoneNumberUtil } = require('google-libphonenumber');
  const phoneNumberUtil = PhoneNumberUtil.getInstance();
  const [countryList, setCountryList] = useState([]);
  const [phoneNumberInfo, setPhoneNumberInfo] = useState(null);
  const phoneNumber = '+905464161542';

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
    try {
      // phoneNumber'ın boş olup olmadığını kontrol et
      if (!phoneNumber) return;
  
      const parsedPhoneNumber = phoneNumberUtil.parseAndKeepRawInput(phoneNumber, 'TR');
      const countryCode = parsedPhoneNumber.getCountryCode();
      const regionCode = phoneNumberUtil.getRegionCodeForNumber(parsedPhoneNumber);
  
      // countryList boşsa ve phoneNumberInfo zaten doluysa güncelleme yapma
      if (countryList.length === 0 || phoneNumberInfo) return;
  
      if (regionCode === 'AR') {
        const turkey = countryList.find(country => country.alpha2Code === 'TR');
  
        setPhoneNumberInfo({
          countryCode: turkey.callingCodes[0], // Türkiye'nin ülke kodu
          regionCode: 'TR',  
          country: turkey.name 
        });
      } else {
        const foundCountry = countryList.find(country => country.alpha2Code === regionCode);
  
        setPhoneNumberInfo({
          countryCode,
          regionCode,
          country: foundCountry ? foundCountry.name : "Unknown"
        });
      }
    } catch (error) {
      // Hata durumunu daha ayrıntılı ele alabiliriz
      console.error('Error while parsing phone number:', error.message);
      // Kullanıcıya hatayı göstermek için bir uyarı gösterebiliriz
      // setError(true);
    }
  }, [phoneNumber, countryList, phoneNumberInfo]);
  


  return (
    <div>
      <Informations />
    
    
    </div>
  );
}

export default Information;
