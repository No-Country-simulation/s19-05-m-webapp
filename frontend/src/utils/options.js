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
        { value: 'Seleccionar Modelo', disabled: true },
        { value: 'Windows 10' },
        { value: 'Windows 11' }
    ],
    PlayStation: [
        { value: 'Seleccionar Modelo', disabled: true },
        { value: 'PlayStation 4' },
        { value: 'PlayStation 5' }
    ],
    Nintendo: [
        { value: 'Seleccionar Modelo', disabled: true },
        { value: 'Standard Model' },
        { value: 'OLED Model' }
    ],
};

const countryOptions = [
    { value: 'Seleccionar País' },
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
];

const statusOptions = [
    { value: 'Pendiente' },
    { value: 'Enviado' },
    { value: 'Completado' },
    { value: 'Cancelado' }
];

const options = {
    genreOptions,
    platformOptions,
    modelOptions,
    modelOptionsByPlatform,
    countryOptions,
    statusOptions,
}

export default options;
  