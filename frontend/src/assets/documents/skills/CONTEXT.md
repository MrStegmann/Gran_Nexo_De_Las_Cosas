# Guía de Creación de Habilidades

Este documento define la estructura y reglas necesarias para diseñar y equilibrar las **Habilidades** dentro del sistema de juego.

## Concepto Básico
Las habilidades son **acciones no mágicas** y técnicas marciales que pueden realizar los personajes. Representan proezas físicas, maniobras tácticas, estilos de combate o técnicas defensivas.

Al carecer de naturaleza mágica, estas habilidades van directamente ligadas a los atributos físicos y a sus talentos derivados. En concreto, solo pueden pertenecer a:
*   **Fuerza**
*   **Destreza**
*   **Constitución**
*   **Sabiduría**
*   **Carisma**

En la práctica, esto significa que el uso de cualquier habilidad va a requerir disponer de puntos en ciertos talentos específicos para poder aprenderla, o bien, sumará el valor de esos talentos a sus tiradas de ataque, defensa o cálculo de daño/efecto.

## Estructura y Propiedades
Para que una habilidad sea válida en el sistema, debe contar obligatoriamente con las siguientes propiedades en su diseño:

*   **Coste de Acciones:** El número de acciones (ofensivas, defensivas o adicionales) que consume ejecutar la habilidad durante el turno del personaje.
*   **Coste de Ranuras:** La cantidad de "Ranuras de habilidad/hechizos" que ocupa en la ficha del personaje para poder conocerla y tenerla equipada.
*   **Turnos de Efecto:** Cuánto tiempo dura el efecto de la habilidad una vez ejecutada (por ejemplo, si causa un sangrado, derribo o si otorga un bonificador temporal). Puede ser instantáneo (0 o nulo) o tener duración.
*   **Turnos de Enfriamiento (Cooldown):** La cantidad de turnos completos que el personaje debe esperar antes de poder volver a usar esa habilidad.

## Organización de los Archivos
Para mantener el código y los datos limpios y manejables, las habilidades **deben estar separadas en distintos archivos `.json`** vinculados al atributo al que pertenecen.

Esta es la nomenclatura y separación que se debe seguir al crearlas:
*   `fuerza_skills.json`: Habilidades de golpes contundentes, uso de armas pesadas, agarres, o proezas atléticas.
*   `destreza_skills.json`: Habilidades acrobáticas, ataques de precisión, sigilo, juego de manos y fintas rápidas.
*   `constitucion_skills.json`: Habilidades de aguante, mitigación de daño extrema, recuperación de estamina o resistencia a estados.
*   `sabiduria_skills.json`: Habilidades de percepción, conocimiento, etc.
*   `carisma_skills.json`: Habilidades sociales, engaño, diplomacia, etc.
