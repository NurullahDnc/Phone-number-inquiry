


const TextClip = ({ text, minLength, maxLength }) => {
    // Cihaz tipine göre uygun uzunluğu belirleyin
    const lengthToShow = window.innerWidth < 768 ? minLength : maxLength;

    // Metin minimum uzunluktan kısaysa tam metni döndür
    if (text && text.length <= lengthToShow) {
        return text;
    }

    // Metin maksimum uzunluktan uzunsa, kırpın ve üç nokta ekleyin
    return text ? text.substring(0, lengthToShow) + "..." : "";
};

export default TextClip;
