const platformOptions = [
    { value: 'Seleccionar Plataforma', disabled: true },
    { value: 'Nintendo' },
    { value: 'PlayStation' },
    { value: 'PC' },
    { value: 'Xbox' }
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
  