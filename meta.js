export const _meta = {
    title: 'UkKHUWAH PROJECT - Bersama Dijalan Dakwah',
    description: 'I\'tikaf 10 Hari Terakhir Ramadhan 1445 Di Masjid Al-Adhim. Ramadhan ini kita I\'tikaf bersama keluarga dan teman teman. Membaca Al-Quran, Qiyamul Lail. Konsultasi Syariah, Berdzikir dan Berdoa. Ditemani secangkir kopi agar Ibadah Makin Hepi',
    image: process.env.NUXT_PUBLIC_API_URI + '/dummy/itikafposter.jpeg',
    image_type: 'image/jpeg',
    // image_width: '900',
    // image_height: '508'
};

export const meta = [
    {
        name: 'description',
        content: _meta.description
    },
    {
        property: 'og:title',
        content: _meta.title
    },
    {
        property: 'og:description',
        content: _meta.description
    },
    {
        property: 'og:site_property',
        content: _meta.description
    },
    {
        property: 'og:type',
        content: 'website'
    },
    {
        property: 'og:image',
        content: _meta.image
    },
    {
        property: 'og:image:type',
        content: _meta.image_type
    },
    // {
    //     property: 'og:image:width',
    //     content: _meta.image_width
    // },
    // {
    //     property: 'og:image:height',
    //     content: _meta.image_height
    // },
    {
        name: 'twitter:card',
        content: 'summary_large_image'
    },
    {
        property: 'twitter:title',
        content: _meta.title
    },
    {
        property: 'twitter:description',
        content: _meta.description
    },
    {
        property: 'twitter:image',
        content: _meta.image
    },
    // {
    //     property: 'twitter:image:width',
    //     content: _meta.image_width
    // },
    // {
    //     property: 'twitter:image:height',
    //     content: _meta.image_height
    // },
];
