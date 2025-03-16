'use client';

import { AnalyticsResponse } from '@/action/analytics-action';
import img5 from '@/public/images/country/bangladesh.png';
import img6 from '@/public/images/country/brazil.png';
import img2 from '@/public/images/country/france.png';
import img3 from '@/public/images/country/india.png';
import img4 from '@/public/images/country/spain.png';
import img1 from '@/public/images/country/usa.png';
import { VectorMap } from '@south-paw/react-vector-maps';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import world from './worldmap.json';

interface SelectingLayersProps {
  height?: number;
  analytics: AnalyticsResponse | { status: string; message: string };
}

// Mapping ISO country codes to country names
const countryCodeToName: Record<string, string> = {
  us: 'United States',
  fr: 'France',
  in: 'India',
  es: 'Spain',
  bd: 'Bangladesh',
  br: 'Brazil',
  id: 'Indonesia',
  my: 'Malaysia',
  sg: 'Singapore',
  th: 'Thailand',
  vn: 'Vietnam',
  ph: 'Philippines',
  jp: 'Japan',
  kr: 'South Korea',
  cn: 'China',
  au: 'Australia',
  nz: 'New Zealand',
  gb: 'United Kingdom',
  de: 'Germany',
  it: 'Italy',
  ca: 'Canada',
  mx: 'Mexico',
  ru: 'Russia',
  za: 'South Africa',
  ng: 'Nigeria',
  eg: 'Egypt',
  sa: 'Saudi Arabia',
  ae: 'United Arab Emirates',
  tr: 'Turkey',
  pk: 'Pakistan',
  gl: 'Greenland',
  lt: 'Lithuania',
  tt: 'Trinidad and Tobago',
  // Tambahkan lebih banyak pemetaan kode negara sesuai kebutuhan
};

// Pemetaan bendera negara berdasarkan region
// Catatan: Ini adalah pemetaan sementara sampai kita memiliki bendera yang sesuai untuk setiap negara
const countryImages: Record<string, any> = {
  // Bendera yang sudah ada
  'United States': img1,
  France: img2,
  India: img3,
  Spain: img4,
  Bangladesh: img5,
  Brazil: img6,

  // Negara-negara Asia
  Indonesia: img3, // Untuk sementara gunakan bendera India
  Malaysia: img3, // Untuk sementara gunakan bendera India
  Singapore: img3, // Untuk sementara gunakan bendera India
  Thailand: img3, // Untuk sementara gunakan bendera India
  Vietnam: img3, // Untuk sementara gunakan bendera India
  Philippines: img3, // Untuk sementara gunakan bendera India
  Japan: img3, // Untuk sementara gunakan bendera India
  'South Korea': img3, // Untuk sementara gunakan bendera India
  China: img3, // Untuk sementara gunakan bendera India
  Pakistan: img5, // Untuk sementara gunakan bendera Bangladesh

  // Negara-negara Eropa
  'United Kingdom': img2, // Untuk sementara gunakan bendera Prancis
  Germany: img2, // Untuk sementara gunakan bendera Prancis
  Italy: img4, // Untuk sementara gunakan bendera Spanyol
  Lithuania: img2, // Untuk sementara gunakan bendera Prancis

  // Negara-negara Amerika
  Canada: img1, // Untuk sementara gunakan bendera USA
  Mexico: img6, // Untuk sementara gunakan bendera Brazil
  Greenland: img1, // Untuk sementara gunakan bendera USA
  'Trinidad and Tobago': img6, // Untuk sementara gunakan bendera Brazil

  // Negara-negara Afrika
  Nigeria: img6, // Untuk sementara gunakan bendera Brazil
  'South Africa': img6, // Untuk sementara gunakan bendera Brazil
  Egypt: img5, // Untuk sementara gunakan bendera Bangladesh

  // Negara-negara Oceania
  Australia: img1, // Untuk sementara gunakan bendera USA
  'New Zealand': img1, // Untuk sementara gunakan bendera USA

  // Negara-negara Timur Tengah
  'Saudi Arabia': img5, // Untuk sementara gunakan bendera Bangladesh
  'United Arab Emirates': img5, // Untuk sementara gunakan bendera Bangladesh
  Turkey: img4, // Untuk sementara gunakan bendera Spanyol

  // Negara-negara lainnya
  Russia: img2, // Untuk sementara gunakan bendera Prancis
};

// Pemetaan tambahan untuk nama negara yang mungkin memiliki format berbeda
const countryNameMapping: Record<string, string> = {
  'united states': 'United States',
  usa: 'United States',
  us: 'United States',
  'united states of america': 'United States',
  'united kingdom': 'United Kingdom',
  uk: 'United Kingdom',
  'great britain': 'United Kingdom',
  'republic of india': 'India',
  "people's republic of china": 'China',
  'republic of indonesia': 'Indonesia',
  'republic of singapore': 'Singapore',
  'federative republic of brazil': 'Brazil',
  'french republic': 'France',
  'kingdom of spain': 'Spain',
  "people's republic of bangladesh": 'Bangladesh',
  malaysia: 'Malaysia',
  'republic of lithuania': 'Lithuania',
  greenland: 'Greenland',
  'federal republic of nigeria': 'Nigeria',
  'republic of trinidad and tobago': 'Trinidad and Tobago',
};

// Terjemahan nama negara ke Bahasa Indonesia
const countryTranslations: Record<string, string> = {
  'United States': 'Amerika Serikat',
  France: 'Prancis',
  India: 'India',
  Spain: 'Spanyol',
  Bangladesh: 'Bangladesh',
  Brazil: 'Brasil',
  Indonesia: 'Indonesia',
  Malaysia: 'Malaysia',
  Singapore: 'Singapura',
  Thailand: 'Thailand',
  Vietnam: 'Vietnam',
  Philippines: 'Filipina',
  Japan: 'Jepang',
  'South Korea': 'Korea Selatan',
  China: 'Tiongkok',
  Australia: 'Australia',
  'New Zealand': 'Selandia Baru',
  'United Kingdom': 'Inggris',
  Germany: 'Jerman',
  Italy: 'Italia',
  Canada: 'Kanada',
  Mexico: 'Meksiko',
  Russia: 'Rusia',
  'South Africa': 'Afrika Selatan',
  Nigeria: 'Nigeria',
  Egypt: 'Mesir',
  'Saudi Arabia': 'Arab Saudi',
  'United Arab Emirates': 'Uni Emirat Arab',
  Turkey: 'Turki',
  Pakistan: 'Pakistan',
  Greenland: 'Greenland',
  Lithuania: 'Lituania',
  'Trinidad and Tobago': 'Trinidad dan Tobago',
};

// Fungsi untuk menerjemahkan nama negara ke Bahasa Indonesia
const translateCountryName = (countryName: string): string => {
  return countryTranslations[countryName] || countryName;
};

// Fungsi untuk menormalisasi kode negara
const normalizeCountryCode = (code: string): string => {
  // Hapus spasi dan ubah ke lowercase
  return code.trim().toLowerCase();
};

// Fungsi untuk mencari kode negara dari nama negara
const getCountryCodeFromName = (name: string): string | null => {
  const normalizedName = name.toLowerCase();
  for (const [code, countryName] of Object.entries(countryCodeToName)) {
    if (countryName.toLowerCase() === normalizedName) {
      return code;
    }
  }
  return null;
};

// Fungsi untuk mendapatkan nama negara yang benar dari kode negara atau nama negara
const getProperCountryName = (countryCodeOrName: string): string => {
  // Jika input adalah kode negara, cari nama negara dari pemetaan kode negara
  if (countryCodeOrName.length <= 3) {
    const countryName = countryCodeToName[countryCodeOrName.toLowerCase()];
    if (countryName) return countryName;
  }

  // Coba cari di pemetaan nama negara
  const normalizedName = countryCodeOrName.toLowerCase();
  if (countryNameMapping[normalizedName]) {
    return countryNameMapping[normalizedName];
  }

  // Jika tidak ditemukan, gunakan nama asli
  return countryCodeOrName;
};

// Fungsi untuk menghasilkan warna berdasarkan ID negara
const getCountryColor = (id: string, isSelected: boolean): string => {
  if (isSelected) {
    return '#4338ca'; // Indigo-700 untuk negara yang dipilih
  }

  // Menggunakan hash sederhana dari ID negara untuk menghasilkan warna yang konsisten
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Menghasilkan warna HSL dengan saturasi dan lightness yang tetap
  // Hanya hue yang berubah berdasarkan hash
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

// Fungsi untuk membuat style CSS untuk peta
const createMapStyles = (selected: string[]) => {
  return `
    .dashtail-codeVmapWarning {
      stroke: #fff;
      stroke-width: 0.5;
    }
    
    .dashtail-codeVmapWarning path {
      fill: #a82b2b;
      transition: fill 0.3s ease;
      cursor: pointer;
      outline: none;
    }
    
    .dashtail-codeVmapWarning path:hover {
      fill-opacity: 0.8;
      stroke-width: 1;
    }
    
    .dashtail-codeVmapWarning path[aria-checked="true"] {
      fill: #4338ca !important;
      stroke-width: 1.5;
      stroke: #000;
    }
    
    /* Warna untuk benua */
    .dashtail-codeVmapWarning path[id^="na"] { fill: hsl(0, 70%, 60%); }
    .dashtail-codeVmapWarning path[id^="sa"] { fill: hsl(40, 70%, 60%); }
    .dashtail-codeVmapWarning path[id^="eu"] { fill: hsl(120, 70%, 60%); }
    .dashtail-codeVmapWarning path[id^="af"] { fill: hsl(180, 70%, 60%); }
    .dashtail-codeVmapWarning path[id^="as"] { fill: hsl(240, 70%, 60%); }
    .dashtail-codeVmapWarning path[id^="oc"] { fill: hsl(300, 70%, 60%); }
    
    /* Warna untuk beberapa negara besar */
    .dashtail-codeVmapWarning path[id="us"] { fill: hsl(210, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="ca"] { fill: hsl(10, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="mx"] { fill: hsl(30, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="br"] { fill: hsl(50, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="ar"] { fill: hsl(70, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="gb"] { fill: hsl(90, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="fr"] { fill: hsl(110, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="de"] { fill: hsl(130, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="it"] { fill: hsl(150, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="es"] { fill: hsl(170, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="ru"] { fill: hsl(190, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="cn"] { fill: hsl(210, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="in"] { fill: hsl(230, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="au"] { fill: hsl(250, 70%, 60%); }
    
    /* Warna untuk negara-negara Asia Tenggara */
    .dashtail-codeVmapWarning path[id="id"] { fill: #FF5722; } /* Indonesia - Oranye */
    .dashtail-codeVmapWarning path[id="my"] { fill: #4CAF50; } /* Malaysia - Hijau */
    .dashtail-codeVmapWarning path[id="sg"] { fill: #F44336; } /* Singapura - Merah */
    .dashtail-codeVmapWarning path[id="th"] { fill: #2196F3; } /* Thailand - Biru */
    .dashtail-codeVmapWarning path[id="vn"] { fill: #FFC107; } /* Vietnam - Kuning */
    .dashtail-codeVmapWarning path[id="ph"] { fill: #9C27B0; } /* Filipina - Ungu */
    .dashtail-codeVmapWarning path[id="mm"] { fill: #00BCD4; } /* Myanmar - Cyan */
    .dashtail-codeVmapWarning path[id="kh"] { fill: #795548; } /* Kamboja - Coklat */
    .dashtail-codeVmapWarning path[id="la"] { fill: #607D8B; } /* Laos - Abu-abu Biru */
    .dashtail-codeVmapWarning path[id="bn"] { fill: #E91E63; } /* Brunei - Pink */
    .dashtail-codeVmapWarning path[id="tl"] { fill: #CDDC39; } /* Timor Leste - Lime */
    
    /* Negara lainnya */
    .dashtail-codeVmapWarning path[id="za"] { fill: hsl(290, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="ng"] { fill: hsl(310, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="eg"] { fill: hsl(330, 70%, 60%); }
    .dashtail-codeVmapWarning path[id="jp"] { fill: hsl(350, 70%, 60%); }
  `;
};

// Fungsi untuk mendapatkan bendera yang sesuai berdasarkan nama negara
const getCountryFlag = (countryName: string): any => {
  // Coba cari bendera yang sesuai di pemetaan
  if (countryImages[countryName]) {
    return countryImages[countryName];
  }

  // Jika tidak ditemukan, coba cari berdasarkan region
  // Ini adalah pendekatan sederhana untuk mengelompokkan negara berdasarkan region

  // Negara-negara Asia
  const asianCountries = [
    'Indonesia',
    'Malaysia',
    'Singapore',
    'Thailand',
    'Vietnam',
    'Philippines',
    'Japan',
    'South Korea',
    'China',
    'Taiwan',
    'Hong Kong',
    'Macau',
    'Mongolia',
    'North Korea',
  ];
  if (asianCountries.includes(countryName)) {
    return img3; // Gunakan bendera India untuk negara-negara Asia
  }

  // Negara-negara Eropa
  const europeanCountries = [
    'United Kingdom',
    'Germany',
    'Italy',
    'Spain',
    'Portugal',
    'Netherlands',
    'Belgium',
    'Luxembourg',
    'Switzerland',
    'Austria',
    'Denmark',
    'Sweden',
    'Norway',
    'Finland',
    'Iceland',
    'Ireland',
    'Greece',
    'Poland',
    'Czech Republic',
    'Slovakia',
    'Hungary',
    'Romania',
    'Bulgaria',
    'Croatia',
    'Serbia',
    'Slovenia',
    'Albania',
    'North Macedonia',
    'Montenegro',
    'Bosnia and Herzegovina',
    'Kosovo',
    'Estonia',
    'Latvia',
    'Lithuania',
    'Belarus',
    'Ukraine',
    'Moldova',
  ];
  if (europeanCountries.includes(countryName)) {
    return img2; // Gunakan bendera Prancis untuk negara-negara Eropa
  }

  // Negara-negara Amerika
  const americanCountries = [
    'United States',
    'Canada',
    'Mexico',
    'Brazil',
    'Argentina',
    'Chile',
    'Peru',
    'Colombia',
    'Venezuela',
    'Ecuador',
    'Bolivia',
    'Paraguay',
    'Uruguay',
    'Guyana',
    'Suriname',
    'French Guiana',
    'Panama',
    'Costa Rica',
    'Nicaragua',
    'Honduras',
    'El Salvador',
    'Guatemala',
    'Belize',
    'Cuba',
    'Haiti',
    'Dominican Republic',
    'Jamaica',
    'Trinidad and Tobago',
    'Bahamas',
    'Barbados',
    'Saint Lucia',
    'Grenada',
    'Antigua and Barbuda',
    'Saint Kitts and Nevis',
    'Saint Vincent and the Grenadines',
    'Dominica',
  ];
  if (americanCountries.includes(countryName)) {
    // Gunakan bendera USA untuk negara-negara Amerika Utara
    if (
      [
        'United States',
        'Canada',
        'Mexico',
        'Panama',
        'Costa Rica',
        'Nicaragua',
        'Honduras',
        'El Salvador',
        'Guatemala',
        'Belize',
        'Cuba',
        'Haiti',
        'Dominican Republic',
        'Jamaica',
        'Trinidad and Tobago',
        'Bahamas',
        'Barbados',
        'Saint Lucia',
        'Grenada',
        'Antigua and Barbuda',
        'Saint Kitts and Nevis',
        'Saint Vincent and the Grenadines',
        'Dominica',
      ].includes(countryName)
    ) {
      return img1;
    }
    // Gunakan bendera Brazil untuk negara-negara Amerika Selatan
    return img6;
  }

  // Negara-negara Afrika
  const africanCountries = [
    'South Africa',
    'Nigeria',
    'Egypt',
    'Morocco',
    'Algeria',
    'Tunisia',
    'Libya',
    'Sudan',
    'South Sudan',
    'Ethiopia',
    'Kenya',
    'Tanzania',
    'Uganda',
    'Rwanda',
    'Burundi',
    'Democratic Republic of the Congo',
    'Republic of the Congo',
    'Angola',
    'Zambia',
    'Zimbabwe',
    'Mozambique',
    'Malawi',
    'Namibia',
    'Botswana',
    'Lesotho',
    'Eswatini',
    'Madagascar',
    'Comoros',
    'Mauritius',
    'Seychelles',
    'Cape Verde',
    'Sao Tome and Principe',
    'Guinea-Bissau',
    'Guinea',
    'Sierra Leone',
    'Liberia',
    'Ivory Coast',
    'Ghana',
    'Togo',
    'Benin',
    'Burkina Faso',
    'Mali',
    'Niger',
    'Chad',
    'Central African Republic',
    'Cameroon',
    'Equatorial Guinea',
    'Gabon',
    'Eritrea',
    'Djibouti',
    'Somalia',
    'Gambia',
    'Senegal',
    'Mauritania',
  ];
  if (africanCountries.includes(countryName)) {
    // Gunakan bendera Bangladesh untuk negara-negara Afrika Utara dan Timur
    if (
      [
        'Egypt',
        'Morocco',
        'Algeria',
        'Tunisia',
        'Libya',
        'Sudan',
        'South Sudan',
        'Ethiopia',
        'Kenya',
        'Tanzania',
        'Uganda',
        'Rwanda',
        'Burundi',
        'Eritrea',
        'Djibouti',
        'Somalia',
      ].includes(countryName)
    ) {
      return img5;
    }
    // Gunakan bendera Brazil untuk negara-negara Afrika lainnya
    return img6;
  }

  // Negara-negara Timur Tengah
  const middleEasternCountries = [
    'Saudi Arabia',
    'United Arab Emirates',
    'Qatar',
    'Kuwait',
    'Bahrain',
    'Oman',
    'Yemen',
    'Iraq',
    'Iran',
    'Syria',
    'Lebanon',
    'Jordan',
    'Israel',
    'Palestine',
    'Turkey',
    'Cyprus',
  ];
  if (middleEasternCountries.includes(countryName)) {
    return img5; // Gunakan bendera Bangladesh untuk negara-negara Timur Tengah
  }

  // Negara-negara Oceania
  const oceaniaCountries = [
    'Australia',
    'New Zealand',
    'Papua New Guinea',
    'Fiji',
    'Solomon Islands',
    'Vanuatu',
    'Samoa',
    'Kiribati',
    'Tonga',
    'Micronesia',
    'Marshall Islands',
    'Palau',
    'Tuvalu',
    'Nauru',
  ];
  if (oceaniaCountries.includes(countryName)) {
    return img1; // Gunakan bendera USA untuk negara-negara Oceania
  }

  // Jika tidak ditemukan, gunakan bendera default
  return img1; // Gunakan bendera USA sebagai default
};

// Terjemahan untuk beberapa teks
const translations = {
  topCountries: 'Negara Teratas',
  seeAll: 'Lihat Semua',
  visits: 'kunjungan',
  clickToSee: 'Klik pada negara untuk melihat jumlah kunjungan',
};

const SelectingLayers = ({ height = 250, analytics }: SelectingLayersProps) => {
  // State untuk menyimpan negara yang dipilih
  const [selected, setSelected] = useState<string[]>([]);
  // State untuk menyimpan jumlah kunjungan dari negara yang dipilih
  const [selectedCountryVisits, setSelectedCountryVisits] = useState<
    number | null
  >(null);
  // State untuk menyimpan nama negara yang dipilih
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(
    null,
  );

  // Check if analytics data is available
  const hasData = analytics.status === 'success';
  const data = hasData ? (analytics as AnalyticsResponse).data : null;

  // Get country data
  const countryData = data?.visitors.countries || [];

  // Create a map of country codes to visit counts
  // Ini akan digunakan untuk menampilkan jumlah kunjungan saat pengguna mengklik negara
  const countryVisits: Record<string, { count: number; name: string }> = {};

  // Log country data untuk debugging
  console.log('Country data from analytics:', countryData);

  countryData.forEach((country) => {
    if (country.country) {
      // Dapatkan nama negara yang benar
      const properCountryName = getProperCountryName(country.country);

      // Store country name and visit count
      const countryCode = normalizeCountryCode(country.country);
      countryVisits[countryCode] = {
        count: country._count.country,
        name: properCountryName,
      };

      // Juga simpan dengan kode ISO jika tersedia
      const isoCode = getCountryCodeFromName(properCountryName);
      if (isoCode) {
        countryVisits[isoCode] = {
          count: country._count.country,
          name: properCountryName,
        };
      }

      // Log each country mapping
      console.log(
        `Mapped country: ${country.country} -> ${properCountryName} (${countryCode}) with ${country._count.country} visits`,
      );
    }
  });

  // Membuat style untuk peta dengan warna berbeda untuk setiap negara
  const mapStyles = useMemo(() => createMapStyles(selected), [selected]);

  // Handler untuk klik pada negara di peta
  const onClick = (event: React.MouseEvent<SVGPathElement>) => {
    const target = event.currentTarget as SVGPathElement;
    const id = target.getAttribute('id');

    console.log('SVG Path clicked:', target);
    console.log('ID attribute:', id);

    if (id) {
      // Toggle selection - menambah atau menghapus negara dari daftar yang dipilih
      setSelected((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((sid) => sid !== id)
          : [...prevSelected, id],
      );

      // Get country name from ID or mapping
      const countryName = getProperCountryName(id);
      // Terjemahkan nama negara ke Bahasa Indonesia
      const translatedName = translateCountryName(countryName);
      console.log(
        `Country clicked: ${id} -> ${countryName} -> ${translatedName}`,
      );

      // Convert to lowercase for case-insensitive matching
      const countryCodeLower = normalizeCountryCode(id);

      // Log untuk debugging
      console.log('Available country visits:', Object.keys(countryVisits));
      console.log('Looking for country code:', countryCodeLower);

      // Find visit count for this country
      // Coba beberapa variasi kode negara untuk pencocokan
      let countryInfo = countryVisits[countryCodeLower] || null;

      // Jika tidak ditemukan dengan kode, coba dengan nama negara
      if (!countryInfo && countryName) {
        const normalizedName = normalizeCountryCode(countryName);
        console.log('Trying with normalized name:', normalizedName);
        countryInfo = countryVisits[normalizedName] || null;

        // Jika masih tidak ditemukan, coba dengan kode 2 huruf
        if (!countryInfo && id.length === 2) {
          console.log('Trying with 2-letter code:', id);
          countryInfo = countryVisits[id] || null;
        }
      }

      // Jika masih tidak ditemukan, gunakan nilai default
      if (!countryInfo) {
        countryInfo = { count: 0, name: countryName };
        console.log('No match found, using default value');
      }

      console.log('Found country info:', countryInfo);

      // Set selected country info untuk ditampilkan di UI
      setSelectedCountryName(translatedName);
      setSelectedCountryVisits(countryInfo.count);
    }
  };

  // Prepare country list for display
  const topCountries = useMemo(() => {
    return countryData
      .filter((country) => country.country) // Filter out null countries
      .slice(0, 6) // Take top 6
      .map((country) => {
        const countryRawName = country.country as string;
        // Dapatkan nama negara yang benar
        const countryName = getProperCountryName(countryRawName);
        // Terjemahkan nama negara ke Bahasa Indonesia
        const translatedName = translateCountryName(countryName);
        // Cari gambar bendera yang sesuai
        const countryImage = getCountryFlag(countryName);

        console.log(
          `Preparing country: ${countryRawName} -> ${countryName} -> ${translatedName} with image:`,
          countryImage,
        );

        return {
          name: translatedName, // Gunakan nama negara yang sudah diterjemahkan
          image: countryImage,
          user: country._count.country,
        };
      });
  }, [countryData]);

  // Use default data if no data available
  const defaultCountry = [
    { name: translateCountryName('United States'), image: img1, user: 32900 },
    { name: translateCountryName('France'), image: img2, user: 30456 },
    { name: translateCountryName('India'), image: img3, user: 29703 },
    { name: translateCountryName('Spain'), image: img4, user: 27533 },
    { name: translateCountryName('Bangladesh'), image: img5, user: 27523 },
    { name: translateCountryName('Brazil'), image: img6, user: 23289 },
  ];

  const country =
    hasData && topCountries.length > 0 ? topCountries : defaultCountry;

  return (
    <div className='grid grid-cols-12 gap-4 sm:gap-6'>
      <style dangerouslySetInnerHTML={{ __html: mapStyles }} />
      <div className='col-span-12 md:col-span-8'>
        <div style={{ height: `${height}px`, width: '100%' }}>
          <VectorMap
            {...world}
            layerProps={{ onClick }}
            checkedLayers={selected}
            className='dashtail-codeVmapWarning h-full w-full object-cover'
          />
        </div>
        <div className='mt-4 text-center'>
          {selectedCountryName && (
            <div className='rounded-md bg-card p-4 shadow-sm'>
              <p className='text-lg font-medium text-card-foreground'>
                {selectedCountryName}
              </p>
              <p className='text-2xl font-bold text-primary'>
                {selectedCountryVisits || 0}{' '}
                <span className='text-sm font-normal'>
                  {translations.visits}
                </span>
              </p>
            </div>
          )}
          {!selectedCountryName && (
            <p className='text-sm font-medium text-card-foreground'>
              {translations.clickToSee}
            </p>
          )}
        </div>
      </div>
      <div className='col-span-12 mt-9 md:col-span-4 md:mt-0'>
        <div className='flex items-center justify-between border-b pb-2'>
          <div className='text-base font-semibold text-default-900'>
            {translations.topCountries}
          </div>
          <Link
            href='/analytics'
            className='text-xs font-medium text-primary hover:underline'
          >
            {translations.seeAll}
          </Link>
        </div>
        <div className='py-5'>
          {country.map((item, i) => (
            <div
              key={i}
              className='flex flex-wrap items-center justify-between pb-3.5'
            >
              <div className='flex items-center gap-3'>
                <div className='inline-block h-9 w-9 overflow-hidden rounded-full'>
                  <Image
                    className='h-full w-full object-cover'
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <span className='inline-block text-sm font-medium text-default-600'>
                  {item.name}
                </span>
              </div>
              <div className='rounded bg-default-100 p-1.5 text-sm text-default-600 dark:bg-default-50'>
                {item.user}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectingLayers;
