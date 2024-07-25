import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useTranslation } from 'react-i18next';

const cities = {
    AbaAlworood: "Aba Alworood",
    Abha: "Abha",
    AbhaManhal: "Abha Manhal",
    Abqaiq: "Abqaiq",
    AbuAjram: "Abu Ajram",
    AbuAreish: "Abu Areish",
    AdDahinah: "Ad Dahinah",
    AdDubaiyah: "Ad Dubaiyah",
    Addayer: "Addayer",
    Adham: "Adham",
    Afif: "Afif",
    Aflaj: "Aflaj",
    AhadMasarha: "Ahad Masarha",
    AhadRufaidah: "Ahad Rufaidah",
    AinDar: "Ain Dar",
    AlAdari: "Al Adari",
    AlAis: "Al Ais",
    AlAjfar: "Al Ajfar",
    AlAmmarah: "Al Ammarah",
    AlArdah: "Al Ardah",
    AlArja: "Al Arja",
    AlAsyah: "Al Asyah",
    AlBada: "Al Bada",
    AlBashayer: "Al Bashayer",
    AlBatra: "Al Batra",
    AlBijadyah: "Al Bijadyah",
    AlDalemya: "Al Dalemya",
    AlFuwaileq: "Al Fuwaileq",
    AlHait: "Al hait",
    AlHaith: "Al Haith",
    AlHassa: "Al Hassa",
    AlHayathem: "Al Hayathem",
    AlHufayyirah: "Al Hufayyirah",
    AlHulayfahAsSufla: "Al Hulayfah As Sufla",
    AlIdabi: "Al Idabi",
    AlJishah: "Al Jishah",
    AlJumum: "Al Jumum",
    AlKhishaybi: "Al Khishaybi",
    AlKhitah: "Al Khitah",
    AlLaqayit: "Al Laqayit",
    AlMada: "Al Mada",
    AlMadaya: "Al Madaya",
    AlMadinahAlMunawwarah: "Al Madinah Al Munawwarah",
    AlMahani: "Al Mahani",
    AlMahd: "Al Mahd",
    AlMidrij: "Al Midrij",
    AlMoya: "Al Moya",
    AlQarin: "Al Qarin",
    AlUwayqilah: "Al Uwayqilah",
    AlWasayta: "Al Wasayta",
    AlJsh: "Al-Jsh",
    Alghat: "Alghat",
    Alhada: "Alhada",
    Alnabhanya: "Alnabhanya",
    Alrass: "Alrass",
    Amaq: "Amaq",
    AnNabkAbuQasr: "An Nabk Abu Qasr",
    AnNafiah: "An Nafiah",
    AnNuqrah: "An Nuqrah",
    Anak: "Anak",
    Aqiq: "Aqiq",
    Aqool: "Aqool",
    ArRadifah: "Ar Radifah",
    ArRafiah: "Ar Rafiah",
    ArRishawiyah: "Ar Rishawiyah",
    Arar: "Arar",
    Artawiah: "Artawiah",
    AsSulaimaniyah: "As Sulaimaniyah",
    AsSulubiayh: "As Sulubiayh",
    Asfan: "Asfan",
    AshShaara: "Ash Shaara",
    AshShamli: "Ash Shamli",
    AshShananah: "Ash Shananah",
    AshShimasiyah: "Ash Shimasiyah",
    AshShuqaiq: "Ash Shuqaiq",
    Asheirah: "Asheirah",
    AtTuwayr: "At Tuwayr",
    Atawleh: "Atawleh",
    AthThybiyah: "Ath Thybiyah",
    Awamiah: "Awamiah",
    AynFuhayd: "Ayn Fuhayd",
    Badaya: "Badaya",
    Bader: "Bader",
    BadrAlJanoub: "Badr Al Janoub",
    Baha: "Baha",
    Bahara: "Bahara",
    BahrAbuSukaynah: "Bahr Abu Sukaynah",
    BahratAlMoujoud: "Bahrat Al Moujoud",
    Balahmar: "Balahmar",
    Balasmar: "Balasmar",
    Balqarn: "Balqarn",
    BaqaAshSharqiyah: "Baqa Ash Sharqiyah",
    Baqaa: "Baqaa",
    Baqiq: "Baqiq",
    Bareq: "Bareq",
    Batha: "Batha",
    Biljurashi: "Biljurashi",
    Birk: "Birk",
    Bish: "Bish",
    Bisha: "Bisha",
    Bukeiriah: "Bukeiriah",
    Buraidah: "Buraidah",
    Daelim: "Daelim",
    Damad: "Damad",
    Dammam: "Dammam",
    Darb: "Darb",
    Daryah: "Daryah",
    Dawadmi: "Dawadmi",
    Deraab: "Deraab",
    DereIyeh: "DereIyeh",
    Dhabyah: "Dhabyah",
    Dhahban: "Dhahban",
    Dhahran: "Dhahran",
    DhahranAlJanoob: "Dhahran Al Janoob",
    Dhurma: "Dhurma",
    Diriyah: "Diriyah",
    DomatAlJandal: "Domat Al Jandal",
    Duba: "Duba",
    Duhknah: "Duhknah",
    DulayRashid: "Dulay Rashid",
    Farasan: "Farasan",
    Ghazalah: "Ghazalah",
    Ghtai: "Ghtai",
    Gilwa: "Gilwa",
    Gizan: "Gizan",
    Hadeethah: "Hadeethah",
    HaferAlBatin: "Hafer Al Batin",
    Hail: "Hail",
    Hajrah: "Hajrah",
    HalatAmmar: "Halat Ammar",
    Hali: "Hali",
    Haqil: "Haqil",
    Harad: "Harad",
    Harajah: "Harajah",
    Hareeq: "Hareeq",
    HaweaTaif: "Hawea/Taif",
    Haweyah: "Haweyah",
    HawtatBaniTamim: "Hawtat Bani Tamim",
    HazmAlJalamid: "Hazm Al Jalamid",
    Hedeb: "Hedeb",
    Hinakeya: "Hinakeya",
    Hofuf: "Hofuf",
    Horaimal: "Horaimal",
    HotatSudair: "Hotat Sudair",
    Hubuna: "Hubuna",
    Huraymala: "Huraymala",
    Huroob: "Huroob",
    Jaaraneh: "Ja'araneh",
    JaAraneh: "JaAraneh",
    Jafar: "Jafar",
    Jalajel: "Jalajel",
    Jeddah: "Jeddah",
    Jouf: "Jouf",
    Jubail: "Jubail",
    Kahlah: "Kahlah",
    Kara: "Kara",
    KaraA: "KaraA",
    Karboos: "Karboos",
    Khafji: "Khafji",
    Khaibar: "Khaibar",
    Khairan: "Khairan",
    Khamaseen: "Khamaseen",
    KhamisMushait: "Khamis Mushait",
    Kharj: "Kharj",
    Khasawyah: "Khasawyah",
    Khobar: "Khobar",
    Khodaria: "Khodaria",
    Khulais: "Khulais",
    Khurma: "Khurma",
    KingAbdullahEconomicCity: "King Abdullah Economic City",
    KingKhalidMilitaryCity: "King Khalid Military City",
    Kubadah: "Kubadah",
    Laith: "Laith",
    Layla: "Layla",
    Madinah: "Madinah",
    MahadAlDahab: "Mahad Al Dahab",
    Majarda: "Majarda",
    Majma: "Majma",
    Makkah: "Makkah",
    Mandak: "Mandak",
    Mastura: "Mastura",
    Mawqaq: "Mawqaq",
    Midinhab: "Midinhab",
    Mikhwa: "Mikhwa",
    Milhim: "Milhim",
    MohayelAseer: "Mohayel Aseer",
    Moqaq: "Moqaq",
    Mrat: "Mrat",
    Mubarak: "Mubarak",
    Mubaraz: "Mubaraz",
    Mufarreh: "Mufarreh",
    Mufraq: "Mufraq",
    Mukayda: "Mukayda",
    Mukaymas: "Mukaymas",
    Mukaymas: "Mukaymas",
    Mukhayyam: "Mukhayyam",
    Mukhayyam: "Mukhayyam",
    Mukhayyam: "Mukhayyam",
    Munirah: "Munirah",
    Muniriyah: "Muniriyah",
    Nabk: "Nabk",
    Najran: "Najran",
    Nasiriyah: "Nasiriyah",
    Nariyah: "Nariyah",
    Nashish: "Nashish",
    Nawa: "Nawa",
    Nawad: "Nawad",
    Nawadiyah: "Nawadiyah",
    Nawasif: "Nawasif",
    Nawbah: "Nawbah",
    Naufal: "Naufal",
    NewAbqaiq: "New Abqaiq",
    NewMakkah: "New Makkah",
    NorthJeddah: "North Jeddah",
    Qalib: "Qalib",
    Qana: "Qana",
    Qassim: "Qassim",
    Qatif: "Qatif",
    Qibla: "Qibla",
    Qitaf: "Qitaf",
    Qiz: "Qiz",
    Quraish: "Quraish",
    Qusayr: "Qusayr",
    Qutaybah: "Qutaybah",
    Rabigh: "Rabigh",
    Raer: "Raer",
    Rafha: "Rafha",
    Rafidah: "Rafidah",
    Ranya: "Ranya",
    Riyadh: "Riyadh",
    Ruma: "Ruma",
    Rumaih: "Rumaih",
    Sabia: "Sabia",
    Sabya: "Sabya",
    SadrAlHekmah: "Sadr Al Hekmah",
    Safwa: "Safwa",
    Sahba: "Sahba",
    Saida: "Saida",
    Salif: "Salif",
    Salma: "Salma",
    Samhan: "Samhan",
    Sanay: "Sanay",
    Sawa: "Sawa",
    Sayhat: "Sayhat",
    Sayh: "Sayh",
    Shaqra: "Shaqra",
    Shibam: "Shibam",
    Shinas: "Shinas",
    Shuqaiq: "Shuqaiq",
    Sif: "Sif",
    Silw: "Silw",
    Sily: "Sily",
    Taif: "Taif",
    Takh: "Takh",
    Talan: "Talan",
    Tanomah: "Tanomah",
    Tathlith: "Tathlith",
    Tayma: "Tayma",
    Tiz: "Tiz",
    TizAlGharbi: "Tiz Al Gharbi",
    TizAlShamali: "Tiz Al Shamali",
    Ubayd: "Ubayd",
    Ula: "Ula",
    Unayzah: "Unayzah",
    Utaybah: "Utaybah",
    WadiDawaser: "Wadi Dawaser",
    WadiJazan: "Wadi Jazan",
    WadiSalih: "Wadi Salih",
    WadiTurabah: "Wadi Turabah",
    WadiYahya: "Wadi Yahya",
    WadiYatab: "Wadi Yatab",
    WadiYusuf: "Wadi Yusuf",
    Warshah: "Warshah",
    WadiAlDhahr: "Wadi Al Dhahr",
    WadiAlShaba: "Wadi Al Shaba",
    WadiAyn: "Wadi Ayn",
    Yafi: "Yafi",
    Yanbu: "Yanbu",
    Yabrin: "Yabrin",
    Yasir: "Yasir",
    Zahran: "Zahran",
    Zajil: "Zajil",
    Zahr: "Zahr",
    Zatir: "Zatir",
    Zubair: "Zubair",
    Zilfi: "Zilfi",
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


export const RefundForm = () => {
    const { t } = useTranslation();
    const { quantity, price, decreaseQuantity, decreasePrice } = useAuth();
    const navigate = useNavigate();
    const getBankName = (iban) => {
        if (!iban.startsWith("SA") || iban.length !== 24) {
            return t("unknown-bank");
        }
        const bankIdentifier = iban.substring(4, 6);
        return t(bankNameMapping[bankIdentifier] || "unknown-bank");
    };
    const ibanValidationSchema = Yup.string()
        .matches(
            /^SA\d{22}$/,
            t('invalid-iban-format')
        )
        .required(t('iban-required'))
        .test(
            "remove-spaces",
            t('iban-no-spaces'),
            (value) => !/\s/.test(value)
        )
        .transform(value => value.replace(/\s+/g, ''));
    const formik = useFormik({
        initialValues: {
            firstName: "",
            secondName: "",
            familyName: "",
            iban: "",
            email: "",
            productOpened: "",
            reason: "",
            city: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required(t("first-name-required")),
            secondName: Yup.string().required(t("second-name-required")),
            familyName: Yup.string().required(t("family-name-required")),
            iban: ibanValidationSchema,
            email: Yup.string()
                .email(t("invalid-email-format"))
                .required(t("email-required")),
            productOpened: Yup.string().required(t("product-status-required")),
            reason: Yup.string().required(t("reason-required")),
            city: Yup.string().required(t("city-required")),
        }),
        onSubmit: (values) => {
            console.log("Form values:", values);
            decreasePrice(price);
            decreaseQuantity(quantity);
            navigate("/bank-info/confirmation");
        },
    });

    return (
        <div className="flex justify-center items-start mt-12 p-4">
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

                    <div className="relative">
                        <input
                            type="text"
                            name="familyName"
                            value={formik.values.familyName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="form-input w-full text-right placeholder-right border border-gray-300 p-2"
                            placeholder={t("family-name")}
                        />
                        {formik.touched.familyName && formik.errors.familyName ? (
                            <div className="text-red-500 text-sm mt-1 text-right">
                                {formik.errors.familyName}
                            </div>
                        ) : null}
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            name="iban"
                            value={formik.values.iban}
                            onChange={formik.handleChange}
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
                                <option value="perfume-didn't-suite-me">
                                    {t("perfume-didn't-suite-me")}
                                </option>
                                <option value="damaged-product">{t("damaged-product")}</option>
                                <option value="wrong-product">{t("wrong-product")}</option>
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
                            <select
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form-select w-full text-right appearance-none placeholder-right pr-10 py-2"
                            >
                                <option value="" disabled>
                                    {t("select-city")}
                                </option>
                                {Object.entries(cities).map(([key, city]) => (
                                    <option key={key} value={t(`cities.${key}`)}>
                                        {t(`${key}`)}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
                                <FaChevronDown className="text-gray-400" />
                            </div>
                            {formik.touched.city && formik.errors.city ? (
                                <div className="text-red-500 text-sm mt-1 text-right">
                                    {formik.errors.city}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="text-left mt-6">
                        <button
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

