# Preguntas Frecuentes - Estilo LB

## Generales

### ¿Qué es Estilo LB?
Estilo LB es una especificación de código personalizada basada en Desarrollo Dirigido por Especificaciones (SDD). Define cómo nombrar variables, funciones, imports y otros elementos para mantener código consistente y legible.

### ¿Puedo usar Estilo LB en mi proyecto existente?
Sí, pero es mejor aplicarlo gradualmente:
1. Comienza con archivos nuevos
2. Refactoriza archivos antiguos paulatinamente
3. Usa linters para automatizar validación

### ¿Es obligatorio seguir Estilo LB exactamente?
No. Estilo LB es una guía. Si tu proyecto tiene estándares existentes, respeta esos primero. Estilo LB es mejor para proyectos nuevos.

---

## Variables

### ¿Por qué usar `is` para booleanos?
Hace el código más legible. `if (isActive)` es más claro que `if (active)`.

### ¿Qué pasa con variables muy cortas como `x`, `y`, `i`?
En contextos matemáticos o loops muy cortos, son aceptables:
```javascript
// ✅ Aceptable
for (let i = 0; i < 10; i++) { }
const [x, y] = coordinates;

// ❌ No aceptable
let x = userData; // Debería ser más descriptivo
```

### ¿Arrays siempre en plural?
Sí, ayuda a entender que es una colección:
```javascript
// ✅ Correcto
const items = [];

// ❌ Confuso
const item = [];
```

### ¿Cuándo usar `_` al inicio?
Para variables privadas o temporales:
```javascript
let _tempCache = null; // Privada/temporal
let _internalState = {}; // Interna de la clase
```

---

## Funciones

### ¿Todos los handlers deben empezar con `handle`?
Sí, cuando son específicamente para manejar eventos o acciones:
```javascript
handleClick      // ✅
handleSubmit     // ✅
handleError      // ✅
onClick          // ❌ (es el nombre del evento, no del handler)
```

### ¿Qué diferencia hay entre `get`, `fetch` y `retrieve`?
- `get`: Obtiene datos que ya existen localmente o en caché
- `fetch`: Obtiene datos de una fuente externa (API)
- `retrieve`: Alias menos común para fetch

```javascript
function getUser(id) { return cachedUsers[id]; }           // ✅
async function fetchUser(id) { return await api.get(id); } // ✅
function retrieveUser(id) { return db.query(id); }         // ✅ (menos preferido)
```

### ¿Las funciones asíncronas usan los mismos prefijos?
Sí:
```javascript
async function handleUserSubmit(data) { }
async function validateEmail(email) { }
async function processData(data) { }
```

---

## Imports

### ¿Por qué importar en orden específico?
Facilita la lectura y reduce conflictos en merge de Git:
1. **Estándar**: Siempre igual
2. **Externas**: Orden alfabético
3. **Locales**: Orden lógico del proyecto

### ¿Desestructurar siempre?
No, solo lo necesario:
```javascript
// ✅ Correcto - solo lo que usas
import { map, filter } from 'lodash';

// ❌ Excesivo
import _ from 'lodash';
// Pero usas _.map, _.filter (sin desestructurar)
```

### ¿Qué pasa con importaciones por defecto vs nombradas?
Ambas son válidas, pero mantén consistencia:
```javascript
// ✅ Consistente
import React from 'react';
import { useState } from 'react';

// ❌ Inconsistente
import * as React from 'react';
import default from 'utils';
```

---

## Constantes

### ¿Cuándo usar UPPER_SNAKE_CASE?
Para valores que NO cambian nunca:
```javascript
// ✅ Constantes
const MAX_RETRIES = 3;
const API_URL = 'https://api.example.com';

// ❌ No es constante (cambia)
const MAX_RETRIES = calculateMaxRetries();
```

### ¿Números mágicos o constantes?
Siempre constantes:
```javascript
// ❌ Número mágico
if (count > 100) { /* */ }

// ✅ Con constante
const MAX_ITEMS = 100;
if (count > MAX_ITEMS) { /* */ }
```

---

## Archivos

### ¿Kebab-case para todos?
Sí en JavaScript/TypeScript:
```
user-service.ts    ✅
user-handler.js    ✅
UserService.ts     ❌
userService.ts     ❌
```

En Python usa snake_case:
```
user_service.py    ✅
user_handler.py    ✅
```

### ¿Carpetas también en kebab-case?
Preferiblemente:
```
src/
  api/             ✅
  user-service/    ✅
  utilities/       ✅
  UserService/     ❌
```

---

## Validación

### ¿Cómo valido mi código?
1. **Manual**: Usa el checklist en [GUIDE.md](GUIDE.md)
2. **Automático**: Configura ESLint con reglas de Estilo LB
3. **VS Code**: Usa la extensión de Copilot con tus instrucciones

### ¿Hay herramientas de validación automática?
Puedes crear un script de validación:
```bash
# Pseudocódigo de validación
- Variables booleanas: tienen prefijo is/has/can
- Funciones: tienen prefijo handle/get/validate/process
- Constantes: UPPER_SNAKE_CASE
- Imports: agrupados correctamente
```

---

## Lenguajes

### ¿Estilo LB funciona en Python?
Sí, con adaptaciones:
```python
# ✅ Python con Estilo LB
def validate_email(email):
    return EMAIL_REGEX.match(email)

def get_user_by_id(user_id):
    return cached_users.get(user_id)

is_active = True
has_permission = False
user_list = []
```

### ¿Y en Java?
Sí, pero Java tiene convenciones propias (camelCase en métodos es estándar):
```java
// ✅ Java con Estilo LB
public boolean validateEmail(String email) { }
public User getUserById(int id) { }
private boolean isActive = true;
private List<User> users = new ArrayList<>();
```

---

## Contribuciones

### ¿Puedo sugerir cambios a Estilo LB?
Sí, abre un issue en GitHub:
https://github.com/luis-blacio/estilo-lb/issues

### ¿Puedo crear una variante personalizada?
Sí, haz un fork y personaliza según tus necesidades.

---

## Más Ayuda

- 📖 [Guía Completa](GUIDE.md)
- 💻 [Ejemplos de Código](EXAMPLES.md)
- 📋 [Especificación Completa](SPECIFICATION.md)
- 🐛 [Reportar Issues](https://github.com/luis-blacio/estilo-lb/issues)
