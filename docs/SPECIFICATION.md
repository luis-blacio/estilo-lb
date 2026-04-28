---
name: Estilo LB
description: "Use when: Luis Blacio needs code following his personal color scheme conventions for variables (blue), libraries/imports (green), functions (orange), and other elements."
---

# Especificación Estilo LB - Desarrollo Basado en Especificaciones (SDD)

## 1. DEFINICIÓN Y PROPÓSITO

**Identificador:** Estilo-LB-v1.0  
**Propietario:** Luis Blacio  
**Tipo:** Guía de Codificación con Esquema de Colores Conceptual  
**Objetivo:** Establecer convenciones de nombres, organización y esquema de colores para código consistente y legible

---

## 2. ESPECIFICACIÓN DE REQUISITOS

### REQ-001: Convención de Nombres
- **Descripción:** Todo identificador debe seguir convención de nombres específica según su tipo
- **Criticidad:** ALTA
- **Prioridad:** P1

### REQ-002: Esquema de Colores
- **Descripción:** Cada categoría de código debe asociarse con un color conceptual para claridad visual
- **Criticidad:** ALTA
- **Prioridad:** P1

### REQ-003: Organización de Imports
- **Descripción:** Los imports deben estar agrupados y ordenados según su origen
- **Criticidad:** MEDIA
- **Prioridad:** P2

### REQ-004: Documentación
- **Descripción:** El código debe ser autodocumentado mediante nombres descriptivos
- **Criticidad:** MEDIA
- **Prioridad:** P2

---

## 3. ESQUEMA DE COLORES Y CONVENCIONES

### 3.1 Variables (AZUL - #0066CC)

| Tipo | Patrón | Ejemplos | Reglas |
|------|--------|----------|-------|
| Booleanos | `is[PascalCase]`, `has[PascalCase]`, `can[PascalCase]` | `isActive`, `hasPermission`, `canDelete` | Siempre comienza con verbo de estado |
| Números | `[camelCase]` | `count`, `index`, `total`, `maxItems` | Descriptivo del contenido |
| Strings | `[camelCase]` | `userName`, `email`, `message` | Descriptivo del contenido |
| Arrays/Colecciones | `[plural]` | `items`, `users`, `values`, `data` | Plural para indicar colección |
| Privadas/Temporales | `_[camelCase]` | `_tempData`, `_cache` | Prefijo underscore |

**Validación:** 
- ✅ `let userCount = 0;`
- ✅ `const isLogged = true;`
- ❌ `let UC = 0;` (no descriptivo)
- ❌ `let IsLogged = true;` (PascalCase incorrecto)

---

### 3.2 Librerías e Imports (VERDE - #00AA00)

**Orden Obligatorio:**
1. Librerías estándar/core (stdlib, React, etc.)
2. Librerías externas (npm packages)
3. Importaciones locales (proyecto)

**Formato:**
```javascript
// Estándar
import fs from 'fs';
import path from 'path';

// Externas
import React from 'react';
import axios from 'axios';

// Locales
import { getUserData } from './api/user';
import { validateForm } from './utils/validation';
```

**Reglas:**
- Desestructurar solo lo necesario
- Agrupar por tipo de origen
- Importar en orden alfabético dentro de cada grupo

---

### 3.3 Funciones (NARANJA - #FF8800)

| Propósito | Prefijo | Patrón | Ejemplos |
|-----------|---------|--------|----------|
| Event Handler | `handle` | `handle[PascalCase]` | `handleClick`, `handleSubmit`, `handleChange` |
| Getter/Obtener | `get` | `get[PascalCase]` | `getUser`, `getValue`, `getData` |
| Setter/Asignar | `set` | `set[PascalCase]` | `setUser`, `setValue`, `setData` |
| Validación | `is`, `validate` | `is[Condition]`, `validate[PascalCase]` | `isValid`, `validateEmail`, `isLessThan` |
| Conversión | `to`, `convert` | `to[PascalCase]` | `toString`, `toJSON`, `convertToDate` |
| Búsqueda/Filtro | `find`, `filter` | `find[PascalCase]`, `filter[PascalCase]` | `findUser`, `filterActive` |
| Procesamiento | `process` | `process[PascalCase]` | `processData`, `processRequest` |
| Callback | `on[Event]` | `on[PascalCase]` | `onLoad`, `onError`, `onSuccess` |

**Validación:**
- ✅ `function handleUserClick(event) { }`
- ✅ `const isValidEmail = (email) => { }`
- ❌ `function userClick(event) { }` (falta `handle`)
- ❌ `function GetUser() { }` (incorrecto PascalCase)

---

### 3.4 Otros Elementos

| Elemento | Patrón | Ejemplos | Reglas |
|----------|--------|----------|-------|
| Constantes | `UPPER_SNAKE_CASE` | `MAX_ITEMS`, `API_URL`, `DEFAULT_TIMEOUT` | Mayúsculas, underscore entre palabras |
| Clases/Tipos | `PascalCase` | `UserManager`, `HttpClient`, `DataParser` | Comienza con mayúscula |
| Enumeraciones | `PascalCase` | `Status`, `HttpMethod` | Valores en UPPER_SNAKE_CASE |
| Archivos JS/TS | `kebab-case` | `user-service.ts`, `auth-handler.js` | Minúsculas, guiones |
| Archivos Python | `snake_case` | `user_service.py`, `auth_handler.py` | Minúsculas, guiones bajos |
| Carpetas | `kebab-case` o `snake_case` | `src/api/`, `lib/utils/` | Descriptivo, minúsculas |

---

## 4. REGLAS DE ORGANIZACIÓN

### 4.1 Estructura de Archivo

```
1. Imports (agrupados según REQ-003)
2. Constantes (UPPER_SNAKE_CASE)
3. Tipos/Interfaces (PascalCase)
4. Variables globales
5. Funciones/Clases (con prefijos semánticos)
6. Exports
```

### 4.2 Agrupación Lógica

- Funciones relacionadas juntas
- Funciones de utilidad al final
- Funciones públicas antes que privadas

---

## 5. VALIDACIÓN Y CHECKLISTS

### Validación de Variables
- [ ] ¿Usa camelCase?
- [ ] ¿Tiene prefijo semántico si corresponde (is, has, get)?
- [ ] ¿Es descriptivo del contenido?

### Validación de Funciones
- [ ] ¿Tiene prefijo de propósito (handle, get, validate)?
- [ ] ¿Es camelCase?
- [ ] ¿Expresa claramente qué hace?

### Validación de Imports
- [ ] ¿Están agrupados por origen?
- [ ] ¿Están en orden correcto (std → ext → local)?
- [ ] ¿Solo importa lo necesario?

---

## 6. EJEMPLO COMPLETO

```javascript
// 1. IMPORTS (VERDE)
import React, { useState } from 'react';
import axios from 'axios';
import { getUserProfile } from './api/userService';
import { validateEmail } from './utils/validation';

// 2. CONSTANTES
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
const DEFAULT_TIMEOUT = 5000;

// 3. TIPOS
interface User {
  id: number;
  name: string;
  email: string;
}

// 4. VARIABLES
let requestCount = 0; // AZUL

// 5. FUNCIONES (NARANJA)
function handleUserSubmit(formData) {
  if (!validateEmail(formData.email)) {
    return false;
  }
  processUserData(formData);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function processUserData(data) {
  // Lógica aquí
}

// 6. EXPORTS
export { handleUserSubmit, validateEmail };
```

---

## 7. NOTAS IMPORTANTES

- Este es una especificación **viva** que puede evolucionar
- Todos los cambios deben documentarse con versión
- La consistencia es más importante que la perfección
- En caso de conflicto con estándares del proyecto, el proyecto tiene prioridad

---

## 📚 Documentación Relacionada

- [Guía Práctica](GUIDE.md) - Tutorial paso a paso
- [Preguntas Frecuentes](FAQ.md) - FAQ y respuestas
- [Ejemplos Completos](EXAMPLES.md) - Más ejemplos en varios lenguajes
