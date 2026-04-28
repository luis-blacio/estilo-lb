# Estilo LB - Guía de Codificación Basada en Especificaciones

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/luis-blacio/estilo-lb)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

Una especificación de estilo de código personalizada basada en desarrollo dirigido por especificaciones (SDD), diseñada para crear código consistente, legible y mantenible.

---

## 📋 Descripción

**Estilo LB** es una guía de codificación completa que define:

- 🔵 **Variables** con convenciones semánticas
- 🟢 **Imports** organizados jerárquicamente  
- 🟠 **Funciones** con prefijos de propósito
- 📝 **Constantes, tipos y archivos** estandarizados

Basada en **Desarrollo Dirigido por Especificaciones (SDD)**, proporciona requisitos formales, validación y ejemplos para cada aspecto.

---

## 🚀 Inicio Rápido

### 1. Clonar el repositorio
```bash
git clone https://github.com/luis-blacio/estilo-lb.git
cd estilo-lb
```

### 2. Leer la especificación completa
```bash
# Abre la documentación completa
cat docs/SPECIFICATION.md
```

### 3. Usar en VS Code (Copilot)
Copia el archivo `Estilo_LB.instructions.md` a tu carpeta de usuario:

**Windows:**
```powershell
Copy-Item "Estilo_LB.instructions.md" "$env:APPDATA\Code\User\prompts\"
```

**macOS/Linux:**
```bash
cp Estilo_LB.instructions.md ~/.config/Code/User/prompts/
```

---

## 📚 Documentación

| Documento | Descripción |
|-----------|------------|
| [SPECIFICATION.md](docs/SPECIFICATION.md) | Especificación completa en formato SDD |
| [GUIDE.md](docs/GUIDE.md) | Guía práctica paso a paso |
| [EXAMPLES.md](docs/EXAMPLES.md) | Ejemplos de código en múltiples lenguajes |
| [FAQ.md](docs/FAQ.md) | Preguntas frecuentes y respuestas |

---

## 🎨 Esquema de Colores

| Elemento | Color | Código | Descripción |
|----------|-------|--------|-------------|
| Variables | 🔵 Azul | `#0066CC` | camelCase con prefijos semánticos |
| Imports | 🟢 Verde | `#00AA00` | Organizados por origen |
| Funciones | 🟠 Naranja | `#FF8800` | Prefijos de propósito (handle, get, validate) |
| Constantes | ⚫ Negro | — | UPPER_SNAKE_CASE |
| Clases | ⚫ Negro | — | PascalCase |

---

## 📖 Ejemplo Rápido

```javascript
// ✅ Siguiendo Estilo LB

// IMPORTS (🟢 Verde)
import React from 'react';
import axios from 'axios';
import { getUserData } from './api/userService';

// CONSTANTES
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRIES = 3;

// VARIABLES (🔵 Azul)
let processedCount = 0;
let isLoading = false;

// FUNCIONES (🟠 Naranja)
function handleUserSubmit(formData) {
  if (!validateEmail(formData.email)) {
    return false;
  }
  return processUserData(formData);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function processUserData(data) {
  processedCount++;
  return sendToAPI(data);
}
```

---

## 🛠️ Herramientas Recomendadas

- **IDE:** Visual Studio Code con extensión de Copilot
- **Lenguajes:** JavaScript/TypeScript, Python, Java
- **Linting:** ESLint, Pylint (configurables para Estilo LB)
- **Formateo:** Prettier, Black (con reglas personalizadas)

---

## 📦 Disponible en

- ✅ Este repositorio: [luis-blacio/estilo-lb](https://github.com/luis-blacio/estilo-lb)
- ✅ VS Code: Instala como instrucciones personalizadas
- ✅ GitHub: Topic `estilo-lb`, `code-style`, `specification`

---

## 🤝 Contribuciones

¿Quieres mejorar Estilo LB? Lee [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre cómo reportar issues y enviar pull requests.

---

## 📄 Licencia

Este proyecto está licenciado bajo la **MIT License** - ver [LICENSE](LICENSE) para detalles.

---

## 👤 Autor

**Luis Blacio** - [@luis-blacio](https://github.com/luis-blacio)

---

## 🔗 Enlaces Útiles

- [Documentación Completa](docs/SPECIFICATION.md)
- [Ejemplos de Código](docs/EXAMPLES.md)
- [Preguntas Frecuentes](docs/FAQ.md)
- [Reportar Issues](https://github.com/luis-blacio/estilo-lb/issues)

---

**Versión:** 1.0.0  
**Última actualización:** 2026-04-28  
**Mantenedor:** Luis Blacio
