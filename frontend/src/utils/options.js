const platformOptions = [
    { value: 'Seleccionar Plataforma', disabled: true },
    { value: 'Nintendo' },
    { value: 'PlayStation' },
    { value: 'PC' }
];

const modelOptions = [
    { value: 'Seleccionar Modelo', disabled: true },
    { value: 'Standard Model' },
    { value: 'OLED Model' },
    { value: 'PlayStation 5' },
    { value: 'PlayStation 4' },
    { value: 'Windows 10' },
];

const genreOptions = [
    { value: 'Seleccionar Género', disabled: true },
    { value: 'Fantasy' },
    { value: 'Family' },
    { value: 'Sports' },
    { value: 'Adventure' },
    { value: 'Sci-Fi' },
];

const modelOptionsByPlatform = {
    PC: [
        { value: 'Seleccionar Modelo' },
        { value: 'Windows 10' },
        { value: 'Windows 11' }
    ],
    PlayStation: [
        { value: 'Seleccionar Modelo' },
        { value: 'PlayStation 4' },
        { value: 'PlayStation 5' }
    ],
    Nintendo: [
        { value: 'Seleccionar Modelo' },
        { value: 'Standard Model' },
        { value: 'OLED Model' }
    ],
};

const countryOptions = [
    { value: 'Países' },
    { value: 'Argentina'},
    { value: 'Bolivia'},
    { value: 'Chile' },
    { value: 'Colombia' },
    { value: 'Ecuador'},
    { value: 'España' },
    { value: 'Mexico' },
    { value: 'Peru' },
    { value: 'Uruguay'  },
    { value: 'Venezuela' },
]

const options = {
    genreOptions,
    platformOptions,
    modelOptions,
    modelOptionsByPlatform,
    countryOptions,
}

export default options;
  