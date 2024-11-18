
Guía rápida de cómo trabajar en equipo con git, en éste ejemplo vemos el proceso desde que creamos un componente(product-list) hasta que llega a produción. Es decir desde la rama feature/product-list hasta main. 

1. **Crear la rama feature/product-list**:
```bash
git checkout -b feature/product-list
```

2. **Trabajar en el componente**:
	Implementa y realiza cambios en tu componente `ProductList` dentro de esta nueva rama. Asegúrate de hacer commits descriptivos a medida que avanzas.
	```bash
	git add .
	git commit -m "Implement ProductList component"
```

3. **Push a la rama remota**: Una vez estés satisfecho con tu trabajo, sube tu rama al repositorio remoto para que otros puedan revisar tu código.
```bash
	git push origin feature/product-list
```

4. **Crear un Pull Request (PR)** a la rama `develop`: Ve al repositorio en tu plataforma de control de versiones (como GitHub o GitLab) y crea un Pull Request desde `feature/product-list` hacia ```
`develop`. Asegúrate de incluir una descripción clara de los cambios y cualquier contexto relevante.
    
5. **Revisión de código**: Tu equipo revisará el Pull Request. Haz las correcciones necesarias según los comentarios recibidos.
    
6. **Merge del Pull Request (PR) a `develop`**:	Una vez que todos estén satisfechos con los cambios, procede a hacer el merge del Pull Request. Esto puede hacerse manualmente o, si está configurado, automáticamente al aprobar el PR.
    
7. **Actualizar develop y eliminar rama**:
    Una vez hecho el merge, actualiza tu rama `main` localmente y elimina la rama `feature/product-list` para mantener el repositorio limpio.
```bash
	git checkout develop
	git pull origin develop
	git branch -d feature/product-list
```

Generalmente un **reviewer** o **maintainer** se encarga de revisar y pasar a producción los cambios. En equipos grandes existen los puestos de Code Review Enginner o Project Lead. Si no existe nadie tu mismo vuelves a hacer los pasos.

8. **Crear un Pull Request de develop a main**:
    
    Cuando la rama `develop` esté lista para producción, crea un PR desde `develop` hacia `main`.
    
9. **Merge del Pull Request a main**:
    
    Una vez aprobados los cambios, haz el merge del PR a `main`.
    

Este flujo asegura que todas las nuevas características pasen por una fase de desarrollo antes de ser fusionadas en la rama principal de producción. 
