# Ejemplos de Código - Estilo LB

Ejemplos completos en múltiples lenguajes siguiendo Estilo LB.

---

## JavaScript/TypeScript

### Ejemplo 1: User Service

```javascript
// IMPORTS (🟢 VERDE)
import axios from 'axios';
import type { User, ValidationResult } from '../types';
import { validateEmail } from './validators';
import { logError } from '../utils/logger';

// CONSTANTES
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRIES = 3;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// VARIABLES (🔵 AZUL)
let cachedUsers: User[] = [];
let isLoading = false;
let retryCount = 0;

// FUNCIONES (🟠 NARANJA)

/**
 * Obtiene usuario del caché
 */
function getUserById(id: number): User | null {
  return cachedUsers.find(u => u.id === id) || null;
}

/**
 * Valida que el email tenga formato correcto
 */
function validateUserEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Procesa datos de nuevo usuario
 */
function processUserData(userData: Partial<User>): ValidationResult {
  const errors: string[] = [];

  // Validar email
  if (!userData.email || !validateUserEmail(userData.email)) {
    errors.push('Email inválido');
  }

  // Validar nombre
  if (!userData.name || userData.name.trim().length === 0) {
    errors.push('Nombre requerido');
  }

  if (errors.length > 0) {
    return { isValid: false, errors, user: null };
  }

  const newUser: User = {
    id: Date.now(),
    name: userData.name!.trim(),
    email: userData.email!.toLowerCase(),
    isActive: true,
    createdAt: new Date()
  };

  cachedUsers.push(newUser);
  return { isValid: true, errors: [], user: newUser };
}

/**
 * Sincroniza usuarios desde API
 */
async function syncUsersFromAPI(): Promise<boolean> {
  isLoading = true;
  retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      cachedUsers = response.data;
      isLoading = false;
      return true;
    } catch (error) {
      retryCount++;
      logError(`Sync attempt ${retryCount} failed: ${error}`);

      if (retryCount >= MAX_RETRIES) {
        isLoading = false;
        return false;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return false;
}

/**
 * Maneja el envío de formulario de usuario
 */
async function handleUserFormSubmit(formData: FormData): Promise<void> {
  try {
    const userData = {
      name: formData.get('name'),
      email: formData.get('email')
    };

    const result = processUserData(userData);

    if (!result.isValid) {
      console.error('Validación fallida:', result.errors);
      return;
    }

    // Enviar a API
    await axios.post(`${API_BASE_URL}/users`, result.user);
  } catch (error) {
    logError('Error al procesar formulario:', error);
  }
}

// EXPORTS
export {
  getUserById,
  validateUserEmail,
  processUserData,
  syncUsersFromAPI,
  handleUserFormSubmit
};
```

### Ejemplo 2: React Component

```typescript
import React, { useState, useEffect } from 'react';
import { getUserById, processUserData, handleUserFormSubmit } from '../services/user';
import type { User } from '../types';

interface FormData {
  name: string;
  email: string;
}

function UserFormComponent() {
  // ESTADO (🔵 AZUL)
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // EFECTOS
  useEffect(() => {
    loadInitialUser();
  }, []);

  // FUNCIONES (🟠 NARANJA)

  function loadInitialUser() {
    const user = getUserById(1);
    setSelectedUser(user);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      const result = processUserData(formData);

      if (!result.isValid) {
        setErrors(result.errors);
        return;
      }

      await handleUserFormSubmit(new FormData(event.target as HTMLFormElement));
    } catch (error) {
      setErrors(['Error al procesar la solicitud']);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Nombre"
        disabled={isSubmitting}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar'}
      </button>

      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div className="user-info">
          <p>Usuario: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
        </div>
      )}
    </form>
  );
}

export default UserFormComponent;
```

---

## Python

### Ejemplo 1: User Manager

```python
# IMPORTS (🟢 VERDE)
import re
from typing import List, Optional, Dict, Tuple
from dataclasses import dataclass
from datetime import datetime
import requests

# CONSTANTES
API_BASE_URL = 'https://api.example.com'
MAX_RETRIES = 3
EMAIL_REGEX = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
DEFAULT_TIMEOUT = 5

# TIPOS (🔵 AZUL)
@dataclass
class User:
    id: int
    name: str
    email: str
    is_active: bool
    created_at: datetime

@dataclass
class ValidationResult:
    is_valid: bool
    errors: List[str]
    user: Optional[User] = None

# VARIABLES GLOBALES
cached_users: List[User] = []
is_loading = False
retry_count = 0

# FUNCIONES (🟠 NARANJA)

def get_user_by_id(user_id: int) -> Optional[User]:
    """Obtiene usuario del caché"""
    for user in cached_users:
        if user.id == user_id:
            return user
    return None

def validate_user_email(email: str) -> bool:
    """Valida que el email tenga formato correcto"""
    if not email or not isinstance(email, str):
        return False
    return bool(re.match(EMAIL_REGEX, email.strip()))

def validate_user_name(name: str) -> bool:
    """Valida que el nombre sea válido"""
    if not name or not isinstance(name, str):
        return False
    return len(name.strip()) > 0

def process_user_data(user_data: Dict) -> ValidationResult:
    """Procesa y valida datos de usuario"""
    errors: List[str] = []

    # Validar email
    if not validate_user_email(user_data.get('email', '')):
        errors.append('Email inválido')

    # Validar nombre
    if not validate_user_name(user_data.get('name', '')):
        errors.append('Nombre requerido')

    if errors:
        return ValidationResult(is_valid=False, errors=errors)

    new_user = User(
        id=int(datetime.now().timestamp() * 1000),
        name=user_data['name'].strip(),
        email=user_data['email'].lower(),
        is_active=True,
        created_at=datetime.now()
    )

    cached_users.append(new_user)
    return ValidationResult(is_valid=True, errors=[], user=new_user)

def sync_users_from_api() -> Tuple[bool, Optional[str]]:
    """Sincroniza usuarios desde API"""
    global is_loading, retry_count

    is_loading = True
    retry_count = 0

    while retry_count < MAX_RETRIES:
        try:
            response = requests.get(
                f'{API_BASE_URL}/users',
                timeout=DEFAULT_TIMEOUT
            )
            response.raise_for_status()

            users_data = response.json()
            # Procesar datos...
            is_loading = False
            return True, None

        except requests.RequestException as error:
            retry_count += 1

            if retry_count >= MAX_RETRIES:
                is_loading = False
                return False, str(error)

    return False, 'Max retries exceeded'

def handle_user_form_submit(form_data: Dict) -> Tuple[bool, str]:
    """Maneja el envío de formulario de usuario"""
    try:
        result = process_user_data(form_data)

        if not result.is_valid:
            errors_message = ', '.join(result.errors)
            return False, errors_message

        # Enviar a API
        response = requests.post(
            f'{API_BASE_URL}/users',
            json={
                'name': result.user.name,
                'email': result.user.email
            },
            timeout=DEFAULT_TIMEOUT
        )
        response.raise_for_status()

        return True, 'Usuario creado exitosamente'

    except Exception as error:
        return False, f'Error: {str(error)}'
```

### Ejemplo 2: Flask API

```python
# IMPORTS (🟢 VERDE)
from flask import Flask, request, jsonify
from typing import Dict, List
import logging

# Importaciones locales
from .services.user_manager import (
    get_user_by_id,
    process_user_data,
    validate_user_email
)

# CONSTANTES
APP_DEBUG = False
MAX_REQUEST_SIZE = 1048576

# VARIABLES
app = Flask(__name__)
is_running = False
request_count = 0

# LOGGER
logger = logging.getLogger(__name__)

# FUNCIONES (🟠 NARANJA)

def validate_request_data(data: Dict) -> Dict[str, List[str]]:
    """Valida datos de la solicitud"""
    errors = []

    if not data.get('name'):
        errors.append('Nombre requerido')

    if not validate_user_email(data.get('email', '')):
        errors.append('Email inválido')

    return {'errors': errors, 'is_valid': len(errors) == 0}

def handle_api_error(error: Exception, status_code: int = 400) -> Dict:
    """Maneja errores de API"""
    logger.error(f'API Error: {str(error)}')
    return {
        'success': False,
        'error': str(error),
        'status_code': status_code
    }

# RUTAS (🟠 NARANJA)

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_endpoint(user_id: int):
    """Obtiene un usuario por ID"""
    try:
        user = get_user_by_id(user_id)
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        return jsonify({
            'id': user.id,
            'name': user.name,
            'email': user.email
        })
    except Exception as error:
        return jsonify(handle_api_error(error, 500)), 500

@app.route('/users', methods=['POST'])
def create_user_endpoint():
    """Crea un nuevo usuario"""
    try:
        form_data = request.get_json()

        # Validar
        validation = validate_request_data(form_data)
        if not validation['is_valid']:
            return jsonify({'errors': validation['errors']}), 400

        # Procesar
        result = process_user_data(form_data)

        if not result.is_valid:
            return jsonify({'errors': result.errors}), 400

        return jsonify({
            'success': True,
            'user': {
                'id': result.user.id,
                'name': result.user.name,
                'email': result.user.email
            }
        }), 201

    except Exception as error:
        return jsonify(handle_api_error(error, 500)), 500

if __name__ == '__main__':
    app.run(debug=APP_DEBUG)
```

---

## Java

### Ejemplo: User Service

```java
// IMPORTS (🟢 VERDE)
import java.util.*;
import java.time.LocalDateTime;
import java.util.regex.Pattern;

// CONSTANTES
public class UserService {
    private static final String EMAIL_REGEX = 
        "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
    private static final int MAX_RETRIES = 3;
    private static final Pattern EMAIL_PATTERN = 
        Pattern.compile(EMAIL_REGEX);

    // VARIABLES (🔵 AZUL)
    private List<User> cachedUsers = new ArrayList<>();
    private boolean isLoading = false;
    private int retryCount = 0;

    // TIPOS
    public static class User {
        public int id;
        public String name;
        public String email;
        public boolean isActive;
        public LocalDateTime createdAt;

        public User(int id, String name, String email) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.isActive = true;
            this.createdAt = LocalDateTime.now();
        }
    }

    public static class ValidationResult {
        public boolean isValid;
        public List<String> errors;
        public User user;

        public ValidationResult(boolean isValid, List<String> errors, User user) {
            this.isValid = isValid;
            this.errors = errors;
            this.user = user;
        }
    }

    // FUNCIONES (🟠 NARANJA)

    /**
     * Obtiene usuario del caché
     */
    public User getUserById(int id) {
        return cachedUsers.stream()
            .filter(u -> u.id == id)
            .findFirst()
            .orElse(null);
    }

    /**
     * Valida que el email tenga formato correcto
     */
    public boolean validateUserEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        return EMAIL_PATTERN.matcher(email.trim()).matches();
    }

    /**
     * Procesa y valida datos de usuario
     */
    public ValidationResult processUserData(Map<String, String> userData) {
        List<String> errors = new ArrayList<>();

        // Validar email
        String email = userData.getOrDefault("email", "");
        if (!validateUserEmail(email)) {
            errors.add("Email inválido");
        }

        // Validar nombre
        String name = userData.getOrDefault("name", "");
        if (name.trim().isEmpty()) {
            errors.add("Nombre requerido");
        }

        if (!errors.isEmpty()) {
            return new ValidationResult(false, errors, null);
        }

        User newUser = new User(
            (int) System.currentTimeMillis(),
            name.trim(),
            email.toLowerCase()
        );

        cachedUsers.add(newUser);
        return new ValidationResult(true, errors, newUser);
    }

    /**
     * Maneja el envío de formulario de usuario
     */
    public boolean handleUserFormSubmit(Map<String, String> formData) {
        try {
            ValidationResult result = processUserData(formData);

            if (!result.isValid) {
                System.err.println("Errores: " + result.errors);
                return false;
            }

            // Enviar a API...
            return true;

        } catch (Exception error) {
            System.err.println("Error: " + error.getMessage());
            return false;
        }
    }
}
```

---

## Resumen de Patrones

| Lenguaje | Variables | Funciones | Imports |
|----------|-----------|-----------|---------|
| JS/TS | camelCase | camelCase con prefijo | Agrupados |
| Python | snake_case | snake_case con prefijo | Agrupados |
| Java | camelCase | camelCase con prefijo | Organizados |

Todos usan el mismo concepto de prefijos de propósito: `handle`, `get`, `validate`, `process`, etc.
