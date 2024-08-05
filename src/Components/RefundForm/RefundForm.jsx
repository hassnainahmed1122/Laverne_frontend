import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Select from 'react-select'; 

const cities = {
    "AbaAlworood": "أباء الورد",
    "Abha": "أبها",
    "AbhaManhal": "أبها منحل",
    "Abqaiq": "أبقيْق",
    "AbuAjram": "أبو أجرم",
    "AbuAreish": "أبو عريش",
    "AdDahinah": "الدحينة",
    "AdDubaiyah": "الدبيحة",
    "Addayer": "الدير",
    "Adham": "أدهم",
    "Afif": "أفيف",
    "Aflaj": "أفلاج",
    "AhadMasarha": "أحد مسرحة",
    "AhadRufaidah": "أحد رفَيْدَة",
    "AinDar": "عين در",
    "AlAdari": "العدَّاري",
    "AlAis": "العيس",
    "AlAjfar": "العجفر",
    "AlAmmarah": "العمارة",
    "AlArdah": "العردة",
    "AlArja": "العرجة",
    "AlAsyah": "العسية",
    "AlBada": "البدة",
    "AlBashayer": "البشاير",
    "AlBatra": "البترة",
    "AlBijadyah": "البجادية",
    "AlDalemya": "الدلمية",
    "AlFuwaileq": "الفويلق",
    "AlHait": "الحيت",
    "AlHaith": "الحيث",
    "AlHassa": "الحسا",
    "AlHayathem": "الحياتهم",
    "AlHufayyirah": "الحفيرة",
    "AlHulayfahAsSufla": "الحليفة السفلى",
    "AlIdabi": "العدبي",
    "AlJishah": "الجشة",
    "AlJumum": "الجموم",
    "AlKhishaybi": "الخيشبي",
    "AlKhitah": "الخطة",
    "AlLaqayit": "اللقيط",
    "AlMada": "المدة",
    "AlMadaya": "المداية",
    "AlMadinahAlMunawwarah": "المدينة المنورة",
    "AlMahani": "المهاني",
    "AlMahd": "المهد",
    "AlMidrij": "المدرج",
    "AlMoya": "المويا",
    "AlQarin": "القارن",
    "AlUwayqilah": "العويقلة",
    "AlWasayta": "الوسيطة",
    "AlJsh": "الجش",
    "Alghat": "الغط",
    "Alhada": "الحدة",
    "Alnabhanya": "النبهانية",
    "Alrass": "الرس",
    "Amaq": "عماق",
    "AnNabkAbuQasr": "النبك أبو قصر",
    "AnNafiah": "النافية",
    "AnNuqrah": "النقرة",
    "Anak": "عنك",
    "Aqiq": "عقيق",
    "Aqool": "عقول",
    "ArRadifah": "الرادفة",
    "ArRafiah": "الرافية",
    "ArRishawiyah": "الرشاوية",
    "Arar": "عرعر",
    "Artawiah": "الأرطاوية",
    "AsSulaimaniyah": "السلطانية",
    "AsSulubiayh": "الصُلُبية",
    "Asfan": "أَسْفَان",
    "AshShaara": "الشعرة",
    "AshShamli": "الشملي",
    "AshShananah": "الشنانة",
    "AshShimasiyah": "الشميسيّة",
    "AshShuqaiq": "الشقيق",
    "Asheirah": "العشيرة",
    "AtTuwayr": "الطُوير",
    "Atawleh": "العطويّة",
    "AthThybiyah": "الطيبية",
    "Awamiah": "العوامية",
    "AynFuhayd": "عين فُهَيد",
    "Badaya": "بِدَايَا",
    "Bader": "بدر",
    "BadrAlJanoub": "بدر الجنوب",
    "Baha": "الباحة",
    "Bahara": "بحرة",
    "BahrAbuSukaynah": "بحر أبو سكينة",
    "BahratAlMoujoud": "بحرة الموجود",
    "Balahmar": "بللحمر",
    "Balasmar": "بللسمر",
    "Balqarn": "بلقرن",
    "BaqaAshSharqiyah": "بَقَا الشرقية",
    "Baqaa": "بقا",
    "Baqiq": "بقيق",
    "Bareq": "بارق",
    "Batha": "البطحاء",
    "Biljurashi": "بلجرشي",
    "Birk": "بِرْك",
    "Bish": "بِيش",
    "Bisha": "بيشة",
    "Bukeiriah": "بُكَيْرِيَة",
    "Buraidah": "بريدة",
    "Daelim": "الُدَلَيْم",
    "Damad": "ضمد",
    "Dammam": "الدمام",
    "Darb": "الدرب",
    "Daryah": "دَرْيَة",
    "Dawadmi": "الدوادمي",
    "Deraab": "درعاب",
    "DereIyeh": "دَرْعِيَة",
    "Dhabyah": "ذبيحة",
    "Dhahban": "ذهبان",
    "Dhahran": "الظهران",
    "DhahranAlJanoob": "الظهران الجنوب",
    "Dhurma": "ضرما",
    "Diriyah": "الدرعية",
    "DomatAlJandal": "دومة الجندل",
    "Duba": "ضبا",
    "Duhknah": "ضخنة",
    "DulayRashid": "دُلَيْ رشيد",
    "Farasan": "فرسان",
    "Ghazalah": "غزالة",
    "Ghtai": "غطاء",
    "Gilwa": "غيلوى",
    "Gizan": "جيزان",
    "Hadeethah": "حديثة",
    "HaferAlBatin": "حفر الباطن",
    "Hail": "حائل",
    "Hajrah": "حجرة",
    "HalatAmmar": "حالة عمار",
    "Hali": "حلي",
    "Haqil": "حقل",
    "Harad": "حرض",
    "Harajah": "حراج",
    "Hareeq": "حريق",
    "HaweaTaif": "حوية/الطائف",
    "Haweyah": "الحوية",
    "HawtatBaniTamim": "حوطة بني تميم",
    "HazmAlJalamid": "حزم الجلاميد",
    "Hedeb": "حدب",
    "Hinakeya": "الحناكية",
    "Hofuf": "الهفوف",
    "Horaimal": "حريملاء",
    "HotatSudair": "حوطة سدير",
    "Hubuna": "حبونا",
    "Huraymala": "حريملاء",
    "Huroob": "حروب",
    "Jaaraneh": "جارانه",
    "JaAraneh": "جارانه",
    "Jafar": "جعفر",
    "Jalajel": "جلجل",
    "Jeddah": "جدة",
    "Jouf": "الجوف",
    "Jubail": "الجبيل",
    "Kahlah": "كحلة",
    "Kara": "كرا",
    "KaraA": "كرا أ",
    "Karboos": "كربوس",
    "Khafji": "الخفجي",
    "Khaibar": "خيبر",
    "Khairan": "خيراً",
    "Khamaseen": "الخمسين",
    "KhamisMushait": "خميس مشيط",
    "Kharj": "الخرج",
    "Khasawyah": "الخصاوية",
    "Khobar": "الخبر",
    "Khodaria": "الخضرية",
    "Khulais": "خليص",
    "KingAbdullahEconomicCity": "مدينة الملك عبدالله الاقتصادية",
    "Kuhaybar": "خيبر",
    "Layla": "ليلى",
    "Lihyan": "ليحان",
    "Lith": "الليث",
    "Majarda": "المجاردة",
    "MakkahAlMukarramah": "مكة المكرمة",
    "Mandag": "مندق",
    "MashaAlHadeed": "مشاع الحديد",
    "Mashar": "مشار",
    "Mecca": "مكة",
    "Midinhab": "مذنب",
    "Mizab": "ميزاب",
    "Mubadala": "مبادلة",
    "Mulayjah": "مليجة",
    "Muna": "منى",
    "Munifah": "منيفة",
    "Murayr": "مريّر",
    "Muzahmiah": "المزاحمية",
    "Najran": "نجران",
    "Namas": "النماص",
    "Nebyah": "نبيعة",
    "Nimran": "نمران",
    "Nisab": "نصاب",
    "Nmaas": "النماص",
    "Noa": "نوع",
    "Nora": "نورة",
    "Qaisomah": "القيصومة",
    "QaryaAlOlya": "القرية العليا",
    "Qassim": "القصيم",
    "Qateef": "القطيف",
    "Qayieen": "قَيّين",
    "Qilwah": "قلوة",
    "Qorayn": "قرين",
    "Rabigh": "رابغ",
    "Rafha": "رفحاء",
    "Rafhaa": "رفحاء",
    "Rahima": "رحيمة",
    "Raniah": "رنية",
    "Rass": "الرس",
    "RawdatSudair": "روضة سدير",
    "Rayn": "رَيْن",
    "RejalAlmaa": "رجال ألمع",
    "Rema": "رما",
    "Reneiah": "رنية",
    "Riyadh": "الرياض",
    "RiyadhAlKhabra": "رياض الخبراء",
    "RuwwatAlSawamie": "روات السوامي",
    "Sabia": "صبياء",
    "Sadous": "سدوس",
    "Safwa": "صفوى",
    "Saihat": "سيهات",
    "Sakaka": "سكاكا",
    "Samata": "صامطة",
    "Samdah": "صمده",
    "Samira": "سميرا",
    "Saybah": "سيبه",
    "Saylah": "سيلا",
    "Sayyar": "سير",
    "Shaqra": "شقراء",
    "Sharawrah": "شرورة",
    "Shuaibah": "الشعيبة",
    "Siddique": "صديق",
    "Sihat": "سيهات",
    "Simran": "سمران",
    "Sour": "صور",
    "Sowair": "سوير",
    "Tabarjal": "طبرجل",
    "Tabuk": "تبوك",
    "Tamaire": "تمير",
    "Tamise": "تمييز",
    "Tanumah": "تنومة",
    "Tarif": "طريف",
    "Tayma": "تيماء",
    "Taymaayman": "تيمايمان",
    "Thadig": "ثادق",
    "Thadiq": "ثادق",
    "Thumayt": "ثمّيت",
    "Tiwal": "طوال",
    "Turaif": "طريف",
    "Ubhur": "أبحر",
    "Udhailiyah": "أذيلية",
    "Ula": "العلا",
    "Umluj": "أملج",
    "Uraidh": "الرياض",
    "Uraijah": "عريجة",
    "Uraiq": "عريق",
    "Urwah": "عروة",
    "Uyun": "العيون",
    "Wadea": "وديعة",
    "Waez": "واعظ",
    "Waha": "واحة",
    "Wajh": "الوجه",
    "WadiAlDawaser": "وادي الدواسر",
    "Yanbu": "ينبع",
    "Yotmah": "يتما",
    "Zabnah": "زبنة",
    "Zalfi": "الزلفي",
    "Zarf": "ظرف",
    "Zulfi": "الزلفي",
};


const bankNameMapping = {
    80: "مصرف الراجحي",
    20: "بنك الرياض",
    "05": "مصرف الإنماء",
    10: "البنك الأهلي السعودي",
    55: "البنك السعودي الفرنسي",
    45: "البنك السعودي البريطاني",
    15: "بنك البلاد",
    65: "البنك السعودي للاستثمار",
    30: "البنك العربي",
    60: "بنك الجزيرة",
};
const bank_codes = {
    '80': 'RHJI',
    '20': 'RIBL',
    '05': 'INMA',
    '10': 'NCBK',
    '55': 'BSFR',
    '45': 'SABB',
    '15': 'ALBI',
    '65': 'SIBC',
    '30': 'ARNB',
    '60': 'BJAZ'
}


const customStyles = {
    container: (provided) => ({
        ...provided,
        direction: 'rtl', // Ensure text direction is RTL
    }),
    control: (provided) => ({
        ...provided,
        textAlign: 'right', // Align text to the right
        padding: '0', // Remove default padding
        border: '1px solid #ccc', // Border style
        borderRadius: '0.375rem', // Border radius for rounded corners
        boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)', // Optional: shadow for better visibility
    }),
    placeholder: (provided) => ({
        ...provided,
        textAlign: 'right', // Align placeholder text to the right
        direction: 'rtl', // Right-to-left text direction
    }),
    singleValue: (provided) => ({
        ...provided,
        textAlign: 'right', // Align selected value text to the right
        direction: 'rtl', // Right-to-left text direction
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        padding: '0', // Remove default padding
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none', // Hide the indicator separator if needed
    }),
};


export const RefundForm = () => {
    const [citiesOptions, setCitiesOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const { totalPrice, orderData, orderItems, setTotalPrice, setTotalQuantity } = useAuth();
    const navigate = useNavigate();

    const paymentMethodIncludesTabbyOrTamara = orderData?.payment_method?.toLowerCase().includes('tabby') || orderData?.payment_method?.toLowerCase().includes('tamara');

    const getBankName = (iban) => {
        if (!iban.startsWith("SA") || iban.length !== 24) {
            return t("unknown-bank");
        }
        const bankIdentifier = iban.substring(4, 6);
        return t(bankNameMapping[bankIdentifier] || "unknown-bank");
    };

    const ibanValidationSchema = Yup.string()
        .transform(value => value.replace(/-/g, '')) // Removes dashes
        .matches(/^SA\d{22}$/, t('invalid-iban-format'))
        .required(t('iban-required'))
        .test("remove-spaces", t('iban-no-spaces'), (value) => !/\s/.test(value))
        .transform(value => value.replace(/\s+/g, '')); // Removes spaces

    const validationSchema = Yup.object({
        firstName: Yup.string().required(t("first-name-required")),
        secondName: Yup.string().required(t("second-name-required")),
        iban: !paymentMethodIncludesTabbyOrTamara ? ibanValidationSchema : Yup.string(),
        email: Yup.string().email(t("invalid-email-format")).required(t("email-required")),
        productOpened: Yup.string().required(t("product-status-required")),
        reason: Yup.string().required(t("reason-required")),
        city: Yup.string().required(t("city-required")),
    });

    useEffect(() => {
        if (orderData?.Customer) {
            formik.setValues({
                firstName: orderData.Customer.first_name || "",
                secondName: orderData.Customer.last_name || "",
                iban: "",
                email: orderData.Customer.email || "",
                productOpened: "",
                reason: "",
                city: getCityKey(orderData.Customer.city || ""),
            });
        }

        setCitiesOptions(Object.keys(cities).map(key => ({
            value: key,
            label: cities[key]
        })));
    }, [orderData]);


    const handleLoading = (value) => setLoading(value)

    const getCityKey = (arabicCityName) => {
        return Object.keys(cities).find(key => cities[key] === arabicCityName);
    };

    const getBankKey = (bankValue) => {
        const key = Object.keys(bankNameMapping).find(key => bankNameMapping[key] === bankValue)
        return bank_codes[`${key}`]
    }
    const formik = useFormik({
        initialValues: {
            firstName: orderData?.Customer?.first_name || "",
            secondName: orderData?.Customer?.last_name || "",
            iban: "",
            email: orderData?.Customer?.email || "",
            productOpened: "",
            reason: "",
            city: citiesOptions.find(option => option.value === getCityKey(orderData?.Customer?.city)) || "",
        },
        validationSchema,
        onSubmit: async (values) => {
            const returnItems = orderItems.map(item => {
                return {
                    product_id: item.Product.id,
                    quantity: item.refund_quantity
                }
            })
            const payload = {
                payment_method: orderData?.payment_method,
                items: returnItems,
                refund_amount: totalPrice,
                city: values.city,
                reason: values.reason,
                condition: values.productOpened,
                first_name: values.firstName,
                last_name: values.secondName,
                email: values.email,
                bank_code: ''
            }

            if (values.iban) {
                payload.iban = values.iban
                payload.bank_code = getBankKey(getBankName(formik.values.iban))
            }
            const token = localStorage.getItem('token');
            
            try {
                handleLoading(true)
                const response = await axios.post(
                    'http://localhost:3000/api/v1/customer/refund-requests',
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                handleLoading(false)
                if (response.data.uuid) {
                    toast.success("successfully submitted the refund request")
                    setTotalPrice(0);
                    setTotalQuantity(0);
                    setTimeout(() => {
                        navigate(`/bank-info/confirmation/${response.data.uuid}`);
                    }, 1000)
                }
            } catch ({ response }) {
                handleLoading(false)
                toast.error(response.data.message)
            }
        },
    });

    return (
        <div className="flex justify-center items-start mt-12 p-4">
            <ToastContainer />
            <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    <div className="relative">
                        <input
                            type="text"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-input w-full text-right placeholder-right border border-gray-300 p-2"
                            placeholder={t("first-name")}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div className="text-red-500 text-sm mt-1 text-right">
                                {formik.errors.firstName}
                            </div>
                        ) : null}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            name="secondName"
                            value={formik.values.secondName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-input w-full text-right placeholder-right border border-gray-300 p-2"
                            placeholder={t("second-name")}
                        />
                        {formik.touched.secondName && formik.errors.secondName ? (
                            <div className="text-red-500 text-sm mt-1 text-right">
                                {formik.errors.secondName}
                            </div>
                        ) : null}
                    </div>

                    {!paymentMethodIncludesTabbyOrTamara && (
                        <div className="relative">
                            <input
                                type="text"
                                name="iban"
                                value={formik.values.iban}
                                onChange={(e) => {
                                    formik.setFieldValue('iban', e.target.value.replace(/-/g, ''));
                                }}
                                onBlur={formik.handleBlur}
                                className="form-input w-full text-right placeholder-right border border-gray-300 p-2"
                                placeholder={t("iban")}
                            />
                            {formik.touched.iban && formik.errors.iban ? (
                                <div className="text-red-500 text-sm mt-1 text-right">
                                    {formik.errors.iban}
                                </div>
                            ) : null}
                            {formik.values.iban && !formik.errors.iban && (
                                <div className="text-gray-700 text-sm mt-2">
                                    {t("bank-name")}: {getBankName(formik.values.iban)}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-input w-full text-right placeholder-right border border-gray-300 p-2"
                            placeholder={t("email")}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-sm mt-1 text-right">
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>

                    <div className="flex flex-col items-end space-y-4">
                        <div className="relative w-full md:w-4/5">
                            <select
                                name="productOpened"
                                value={formik.values.productOpened}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-select w-full text-right appearance-none placeholder-right pr-10 py-2"
                            >
                                <option value="" disabled>
                                    {t("select-product-status")}
                                </option>
                                <option value="yes">{t("yes")}</option>
                                <option value="no">{t("no")}</option>
                            </select>
                            <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                                <FaChevronDown className="text-gray-400" />
                            </div>
                            {formik.touched.productOpened && formik.errors.productOpened ? (
                                <div className="text-red-500 text-sm mt-1 text-right">
                                    {formik.errors.productOpened}
                                </div>
                            ) : null}
                        </div>

                        <div className="relative w-full md:w-4/5">
                            <select
                                name="reason"
                                value={formik.values.reason}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-select w-full text-right appearance-none placeholder-right pr-10 py-2"
                            >
                                <option value="" disabled>
                                    {t("select-reason")}
                                </option>
                                <option value="perfume didn't suite me">
                                    {t("perfume-didn't-suite-me")}
                                </option>
                                <option value="damaged product">{t("damaged-product")}</option>
                                <option value="wrong product">{t("wrong-product")}</option>
                            </select>
                            <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                                <FaChevronDown className="text-gray-400" />
                            </div>
                            {formik.touched.reason && formik.errors.reason ? (
                                <div className="text-red-500 text-sm mt-1 text-right">
                                    {formik.errors.reason}
                                </div>
                            ) : null}
                        </div>

                        <div className="relative w-full md:w-4/5">
                            <Select
                                name="city"
                                options={citiesOptions}
                                value={{label:formik.values.city, value: getCityKey(formik.values.city)}}
                                onChange={(selectedOption) => {
                                    formik.setFieldValue('city', selectedOption.value)
                                }}
                                onBlur={formik.handleBlur}
                                placeholder={t("select-city")}
                                isClearable={false}
                                styles={customStyles}
                            />
                            {formik.touched.city && formik.errors.city ? (
                                <div className="text-red-500 text-sm mt-1 text-right">
                                    {formik.errors.city}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="text-left mt-6">
                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-black text-white py-2 px-4 rounded"
                        >
                            {t("complete-refund-request")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

