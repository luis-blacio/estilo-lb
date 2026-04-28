/**
 * TEST ESTILO LB
 * Archivo para validar que el código sigue las convenciones
 * Ejemplo: UserService con validación de email y procesamiento de datos
 */

// ============================================
// 1. IMPORTS (🟢 VERDE)
// ============================================

// Librerías externas
const emailValidator = require('email-validator');

// Importaciones locales
// import { logError } from './utils/logger';


// ============================================
// 2. CONSTANTES
// ============================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_USERNAME_LENGTH = 30;
const DEFAULT_RETRY_ATTEMPTS = 3;


// ============================================
// 3. TIPOS / INTERFAZ
// ============================================

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {boolean} isActive
 * @property {Date} createdAt
 */


// ============================================
// 4. VARIABLES GLOBALES (🔵 AZUL)
// ============================================

let processedUserCount = 0;
let isProcessing = false;
const cachedUsers = [];


// ============================================
// 5. FUNCIONES (🟠 NARANJA)
// ============================================

/**
 * Valida que el email tenga formato correcto
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido, false si no
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
}


/**
 * Valida que la contraseña cumpla requisitos mínimos
 * @param {string} password - Contraseña a validar
 * @returns {boolean} - true si cumple requisitos
 */
function validatePassword(password) {
  return password && password.length >= MIN_PASSWORD_LENGTH;
}


/**
 * Valida que el nombre de usuario sea válido
 * @param {string} userName - Nombre de usuario
 * @returns {boolean} - true si es válido
 */
function isValidUserName(userName) {
  if (!userName || typeof userName !== 'string') {
    return false;
  }
  const trimmedName = userName.trim();
  return trimmedName.length > 0 && trimmedName.length <= MAX_USERNAME_LENGTH;
}


/**
 * Procesa y valida datos de un nuevo usuario
 * @param {Object} userData - Datos del usuario a procesar
 * @returns {Object} - Resultado de la validación y procesamiento
 */
function processUserData(userData) {
  const validationResult = {
    isValid: true,
    errors: [],
    processedUser: null
  };

  // Validar email
  if (!validateEmail(userData.email)) {
    validationResult.isValid = false;
    validationResult.errors.push('Email inválido o no proporcionado');
  }

  // Validar contraseña
  if (!validatePassword(userData.password)) {
    validationResult.isValid = false;
    validationResult.errors.push(`Contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`);
  }

  // Validar nombre de usuario
  if (!isValidUserName(userData.name)) {
    validationResult.isValid = false;
    validationResult.errors.push(`Nombre debe tener entre 1 y ${MAX_USERNAME_LENGTH} caracteres`);
  }

  // Si toda validación pasó, procesar usuario
  if (validationResult.isValid) {
    const newUser = {
      id: generateUserId(),
      name: userData.name.trim(),
      email: userData.email.toLowerCase(),
      isActive: true,
      createdAt: new Date()
    };

    cachedUsers.push(newUser);
    processedUserCount++;
    validationResult.processedUser = newUser;
  }

  return validationResult;
}


/**
 * Genera un ID único para usuario
 * @returns {number} - ID generado
 */
function generateUserId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}


/**
 * Obtiene usuario del caché por email
 * @param {string} email - Email del usuario
 * @returns {User|null} - Usuario encontrado o null
 */
function getUserByEmail(email) {
  if (!validateEmail(email)) {
    return null;
  }

  const normalizedEmail = email.toLowerCase();
  return cachedUsers.find(user => user.email === normalizedEmail) || null;
}


/**
 * Obtiene todos los usuarios procesados
 * @returns {Array} - Lista de usuarios en caché
 */
function getAllUsers() {
  return [...cachedUsers];
}


/**
 * Maneja el procesamiento masivo de usuarios
 * @param {Array} userDataList - Lista de datos de usuarios
 * @returns {Object} - Resumen de procesamiento
 */
function handleBulkUserProcessing(userDataList) {
  if (isProcessing) {
    return {
      success: false,
      message: 'Ya hay un procesamiento en curso'
    };
  }

  isProcessing = true;
  const results = {
    totalProcessed: 0,
    successCount: 0,
    failureCount: 0,
    errors: []
  };

  userDataList.forEach((userData, index) => {
    try {
      const result = processUserData(userData);
      results.totalProcessed++;

      if (result.isValid) {
        results.successCount++;
      } else {
        results.failureCount++;
        results.errors.push({
          index,
          email: userData.email,
          messages: result.errors
        });
      }
    } catch (error) {
      results.failureCount++;
      results.errors.push({
        index,
        message: error.message
      });
    }
  });

  isProcessing = false;
  return results;
}


// ============================================
// 6. EXPORTS
// ============================================

module.exports = {
  validateEmail,
  validatePassword,
  isValidUserName,
  processUserData,
  getUserByEmail,
  getAllUsers,
  handleBulkUserProcessing,
  generateUserId
};