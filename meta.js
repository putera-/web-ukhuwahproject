export const _meta = {
    title: 'UKHUWAH PROJECT - Bersama Dijalan Dakwah',
    description: 'Ied Mubarak, Semalat Hari Raya Idul Fitri 1445H / 2024 M. Taqobbalallahu minna wa minkum. Taqobbal yaa Kariim',
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
