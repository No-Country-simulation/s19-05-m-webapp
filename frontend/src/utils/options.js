const platformOptions = [
    { value: 'Seleccionar Plataforma', disabled: true },
    { value: 'Nintendo' },
    { value: 'PlayStation' },
    { value: 'PC' },
    { value: 'Xbox' }
];

const genreOptions = [
    { value: 'Seleccionar Género', disabled: true },
    { value: 'Deporte' },
    { value: 'Aventura' },
    { value: 'Accion' },
    { value: 'Suspenso' },
    { value: 'Carreras' },
];

const modelOptionsByPlatform = {
    PC: [
        { value: 'Seleccionar Modelo', disabled: true },
        { value: 'Windows' },
        { value: 'Mac' },
        { value: 'Linux' }
    ],
    PlayStation: [
        { value: 'Seleccionar Modelo', disabled: true },
        { value: 'PlayStation 4' },
        { value: 'PlayStation 5' }
    ],
    Nintendo: [
        { value: 'Seleccionar Modelo', disabled: true },
        { value: 'Switch' }
    ],
    Xbox: [
        { value: 'Seleccionar Modelo', disabled: true },
        { value: 'One' },
        { value: 'Series x|s' }
    ],
};

const userActive = [
    { value: 'Activo' },
    { value: 'Inactivo' }
]

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

const options = {
    genreOptions,
    platformOptions,
    modelOptionsByPlatform,
    countryOptions,
    userActive,
}

export default options;
  