# Guía Práctica - Estilo LB

## Índice
1. [Primeros Pasos](#primeros-pasos)
2. [Variables](#variables)
3. [Funciones](#funciones)
4. [Imports](#imports)
5. [Checklist de Validación](#checklist-de-validación)

---

## Primeros Pasos

### Paso 1: Entender los Colores

Estilo LB usa un sistema de "colores conceptuales" para categorizar código:

```
🔵 AZUL   = Variables
🟢 VERDE  = Imports
🟠 NARANJA = Funciones
⚫ NEGRO   = Constantes, Clases, Archivos
```

### Paso 2: Aplicar a tu proyecto

1. Copia `Estilo_LB.instructions.md` a tu carpeta de usuario
2. Usa en VS Code con Copilot: *"Sigue Estilo LB"*
3. Valida tu código con el checklist

---

## Variables (🔵 AZUL)

### Booleanos - Siempre `is`, `has`, `can`

```javascript
// ✅ Correcto
const isActive = true;
const hasPermission = false;
const canDelete = true;

// ❌ Incorrecto
const active = true;
const permission = false;
const delete = true;
```

### Números - Descriptivos

```javascript
// ✅ Correcto
let count = 0;
let index = 5;
let totalItems = 100;

// ❌ Incorrecto
let c = 0;
let i = 5;
let t = 100;
```

### Arrays - Plural

```javascript
// ✅ Correcto
const items = [];
const users = [];
const values = [1, 2, 3];

// ❌ Incorrecto
const item = [];
const user = [];
const value = [1, 2, 3];
```

### Variables Privadas - Prefijo underscore

```javascript
// ✅ Correcto
let _cachedData = null;
let _tempCount = 0;

// ❌ Incorrecto
let cachedData = null; // Debería indicar que es temporal
```

---

## Funciones (🟠 NARANJA)

### Event Handlers - `handle`

```javascript
// ✅ Correcto
function handleClick(event) {}
function handleSubmit(formData) {}
function handleChange(value) {}

// ❌ Incorrecto
function onClick(event) {}
function onSubmit(formData) {}
```

### Getters - `get`

```javascript
// ✅ Correcto
function getUserById(id) {}
function getEmailAddress() {}
function getValue(key) {}

// ❌ Incorrecto
function fetchUserById(id) {}
function retrieveEmail() {}
```

### Validadores - `is`, `validate`

```javascript
// ✅ Correcto
function isValid(data) {}
function validateEmail(email) {}
function isGreaterThan(a, b) {}

// ❌ Incorrecto
function valid(data) {}
function checkEmail(email) {}
function greaterThan(a, b) {}
```

### Conversores - `to`, `convert`

```javascript
// ✅ Correcto
function toString() {}
function toJSON() {}
function convertToDate(string) {}

// ❌ Incorrecto
function asString() {}
function json() {}
function dateFromString(string) {}
```

---

## Imports (🟢 VERDE)

### Orden Obligatorio

```javascript
// 1. Librerías estándar
import fs from 'fs';
import path from 'path';

// 2. Librerías externas
import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

// 3. Importaciones locales
import { getUserData } from './api/user';
import { validateForm } from './utils/validation';
import config from './config';
```

### Desestructuración Correcta

```javascript
// ✅ Correcto - solo lo necesario
import { map, filter } from 'lodash';

// ❌ Incorrecto - importa todo innecesariamente
import _ from 'lodash';
const map = _.map;
```

---

## Checklist de Validación

### Antes de Hacer Commit

#### Variables
- [ ] ¿Booleanos tienen prefijo `is`, `has`, `can`?
- [ ] ¿Arrays usan plural?
- [ ] ¿Nombres son descriptivos (no abreviados)?
- [ ] ¿Variables privadas tienen `_` al inicio?

#### Funciones
- [ ] ¿Tienen prefijo de propósito (handle, get, validate)?
- [ ] ¿Usan camelCase?
- [ ] ¿El nombre expresa claramente qué hace?
- [ ] ¿Sin abreviaturas confusas?

#### Imports
- [ ] ¿Están agrupados (std → ext → local)?
- [ ] ¿Solo importan lo necesario?
- [ ] ¿Están en orden alfabético dentro de grupos?

#### Constantes
- [ ] ¿UPPER_SNAKE_CASE?
- [ ] ¿Significativas, no números mágicos?

---

## Ejemplos Completos

### Ejemplo 1: Servicio de Usuarios

```javascript
import axios from 'axios';
import { validateEmail } from './validators';

const API_URL = 'https://api.example.com';
const MAX_RETRIES = 3;

let cachedUsers = [];
let isLoading = false;

function getUserById(id) {
  const user = cachedUsers.find(u => u.id === id);
  return user || null;
}

function validateUser(userData) {
  if (!validateEmail(userData.email)) {
    return false;
  }
  return userData.name && userData.name.length > 0;
}

function processUserData(userData) {
  if (!validateUser(userData)) {
    return null;
  }
  const newUser = { ...userData, createdAt: new Date() };
  cachedUsers.push(newUser);
  return newUser;
}

export { getUserById, processUserData, validateUser };
```

### Ejemplo 2: Componente React

```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm() {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/users', formData);
      // Procesar respuesta
    } catch (error) {
      setErrors([error.message]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input onChange={handleInputChange} />
      <button disabled={isSubmitting}>Enviar</button>
    </form>
  );
}

export default UserForm;
```

---

## Tips y Trucos

### Usar búsqueda y reemplazar para aplicar reglas

**VS Code** - Buscar variables sin prefijo en booleanos:
```regex
// Buscar: const (\w+) = (true|false)
// Que no comience con is, has, can
```

### Configurar ESLint para Estilo LB

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'camelcase': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
  }
};
```

### Usar comentarios JSDoc

```javascript
/**
 * Procesa datos de usuario y valida información
 * @param {Object} userData - Objeto con datos del usuario
 * @param {string} userData.email - Email del usuario
 * @param {string} userData.name - Nombre del usuario
 * @returns {Object|null} Usuario procesado o null si falla validación
 */
function processUserData(userData) {
  // ...
}
```

---

¿Necesitas ayuda con un caso específico? Revisa el [FAQ.md](FAQ.md) o [EXAMPLES.md](EXAMPLES.md)
