Esto es una template para crear una nueva feature. Las carpetas que no se usan no tienen por qué crearse en una nueva feature.
Debe seguir estrictamente esta arquitectura.

La carpeta tendrá el nombre que tendrá la feature.
Todas las funciones reutilizables se crearan en la carpeta /utils y se servirán.
La carpeta /screen servirá los componentes que conforman la feature. Esta carpeta no debe contener componentes reutilizables y deben ser agnósticos para ser usados en otras features.
La carpeta /components servirá los componentes reutilizables que conforman la feature. Estos componentes deben ser agnósticos para ser usados en otras features.

types.ts contendrán interfaces y tipos relacionados con la feature.
enum.ts contendrá enums relacionados con la feature.