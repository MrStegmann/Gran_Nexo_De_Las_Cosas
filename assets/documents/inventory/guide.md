# Guía de Creación de Equipamiento en Total Roleplay 3: Extended

Esta guía está diseñada para que todas las armaduras, escudos y armas que crees a través del complemento **Total Roleplay 3: Extended** sean reconocidas correctamente por nuestro **Gran Addon de las Cosas**. 

Es fundamental que sigas estas instrucciones al pie de la letra. De lo contrario, el complemento no podrá mostrar la información de tus objetos ni activar sus funciones correspondientes.

---

## 🛠️ Paso Inicial Común (Para cualquier objeto)

Para empezar a crear cualquier pieza de equipamiento, sigue estos pasos iniciales dentro del juego:

1. Abre la base de datos haciendo clic en la opción **Extended objects database** (*Base de datos de objetos extendidos*).

![](assets/documents/inventory/imagenes/extended_objects_database_01.png)

2. En la parte inferior de la ventana, dentro de la sección **Actions** (*Acciones*), pulsa sobre el botón **Create item** (*Crear objeto*).

![](assets/documents/inventory/imagenes/extended_objects_database_02.png)

3. En la ventana emergente que aparecerá, selecciona la opción **Blank item** (*Objeto en blanco*).

---

## 🛡️ 1. Creación de Armaduras

Una vez creado el objeto en blanco, configúralo con los siguientes parámetros:

*   **Calidad del objeto (*Item quality*):** Para piezas iniciales, deja la opción predeterminada en **Common** (*Común*).
*   **Nombre del objeto (*Item name*):** Escribe el nombre que prefieras para darle tu toque personal (este campo no afecta al funcionamiento del complemento).
*   **Texto personalizado izquierdo (*Tooltip left custom text*):** Aquí debes especificar el tipo de armadura y, si tiene refuerzo, qué tipo de refuerzo lleva. Es obligatorio respetar estrictamente la siguiente estructura de escritura:
    ***`tipoArmadura[: Refuerzos-TipoRefuerzo]`***

    *   Ejemplos:
        *   `Tela`
        *   `Cuero: Refuerzos-Malla`
        *   `Malla: Refuerzos-Cuero`
        *   `Placa`
*   **Texto personalizado derecho (*Tooltip right custom text*):** Especifica la parte del cuerpo a la que corresponde la pieza. Escribe únicamente una de las siguientes opciones: `Cabeza`, `Pecho`, `Manos` o `Piernas`.
*   **Icono:** Elige el icono visual que más te guste para tu armadura.
*   **Atributos de juego (*Gameplay attributes*):** Es obligatorio marcar la casilla **Wearable** (*Equipable*). Las demás opciones de esta sección no son necesarias.

> ⚠️ **¡Importante!** Los campos de texto personalizado izquierdo y derecho son **obligatorios**. Si no sigues la estructura indicada, el complemento no reconocerá tu armadura.

---

## 🛡️ 2. Creación de Escudos

Configura tu escudo en la ventana del objeto en blanco utilizando las siguientes opciones:

*   **Texto personalizado izquierdo (*Tooltip left custom text*):** Escribe el tipo de escudo según su peso. Debes poner una de estas tres opciones: `Ligero`, `Medio` o `Pesado`.
*   **Texto personalizado derecho (*Tooltip right custom text*):** Escribe exactamente la palabra: `Escudo`.
*   **Icono:** Selecciona el icono que prefieras para mostrar en tu equipamiento.
*   **Atributos de juego (*Gameplay attributes*):** Es obligatorio marcar la casilla **Wearable** (*Equipable*). El resto de casillas pueden quedar vacías.

> ⚠️ **¡Importante!** Configurar estos dos textos personalizados es **obligatorio** para que el complemento identifique correctamente el escudo.

---

## ⚔️ 3. Creación de Armas

Configura tu arma en la ventana del objeto en blanco con los siguientes datos:

*   **Texto personalizado izquierdo (*Tooltip left custom text*):** Este espacio se utiliza para añadir un modificador de mejora que aumentará el daño base del arma. Debes escribir un signo de más seguido del número correspondiente. 
    *   *Ejemplos:* `+1`, `+2`, `+3`, `+4`
*   **Texto personalizado derecho (*Tooltip right custom text*):** Escribe el tipo de arma exacto al que pertenece. 
    *   *Ejemplos:* `Daga`, `Espada corta`, `Hacha de guerra`, etc.
*   **Icono:** Selecciona el icono representativo que prefieras para tu arma.
*   **Atributos de juego (*Gameplay attributes*):** Es obligatorio marcar la casilla **Wearable** (*Equipable*). Deja las demás opciones sin marcar.

> ⚠️ **¡Importante!** El campo de texto personalizado derecho es **obligatorio** para la detección del arma.

---

## 💾 ¿Cómo guardar y equipar tus objetos creados?

Una vez que hayas terminado de rellenar las opciones de tu armadura, escudo o arma, realiza el siguiente procedimiento para utilizarlo:

1. Guarda el objeto pulsando el botón **Save** (*Guardar*).
2. Busca el objeto recién creado en tu lista de creaciones de la base de datos.
3. Haz **clic derecho** sobre él y selecciona la opción **Add to main inventory** (*Añadir al inventario principal*).
4. Dirígete a las opciones generales de Total Roleplay 3 y busca el **icono de la bolsa**:
    *   Haz **clic izquierdo** sobre el icono para abrir tu inventario/bolsa.
    *   Haz **clic derecho** sobre el icono para abrir tu pestaña de equipo del personaje.
5. Con ambas ventanas abiertas, **arrastra el objeto** desde tu inventario y suéltalo en el hueco de equipamiento correspondiente. ¡Listo, ya tienes tu pieza equipada!

---

## 🚨 Información Importante sobre el Orden del Equipo

El complemento escanea tu equipamiento en un orden muy específico para determinar las propiedades de tus armas y defensas:

*   El sistema detecta como **arma principal** el primer objeto equipable que encuentra en la interfaz.
*   La lectura de los huecos se realiza **de arriba hacia abajo**, comenzando primero por la **columna de la izquierda**.

Asegúrate de colocar tus objetos en los huecos correctos respetando las prioridades que desees asignar a tu arma Principal, Secundaria/Escudo o Tercera arma.

![](assets/documents/inventory/imagenes/extended_objects_database_03.png)
