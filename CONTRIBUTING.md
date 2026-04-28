# Contribuyendo a Estilo LB

¡Gracias por tu interés en contribuir! Esta guía te explicará cómo hacerlo.

---

## Tipos de Contribuciones

### 1. Reportar Issues

Si encuentras problemas o tienes sugerencias:

1. Ve a [Issues](https://github.com/luis-blacio/estilo-lb/issues)
2. Click en **New Issue**
3. Describe claramente:
   - **Título:** Resumen conciso
   - **Descripción:** Detalles del problema
   - **Contexto:** Dónde ocurre
   - **Solución sugerida (opcional):** Si tienes idea

**Ejemplo:**
```
Título: Variable booleana sin prefijo "is"
Descripción: En GUIDE.md, el ejemplo muestra "const active" pero según SPECIFICATION.md debe ser "const isActive"
```

### 2. Mejoras a la Documentación

Correcciones, ejemplos nuevos, aclaraciones:

1. Fork el repositorio
2. Edita los archivos en `docs/`
3. Haz commit descriptivo
4. Abre Pull Request

### 3. Ejemplos Nuevos

¿Tienes un ejemplo en otro lenguaje o patrón?

1. Agrega a `docs/EXAMPLES.md` o crea nuevo archivo
2. Asegúrate que siga Estilo LB
3. Incluye comentarios explicativos
4. Abre Pull Request

### 4. Herramientas y Scripts

¿Creaste un linter o validador?

1. Crea carpeta `tools/`
2. Agrega README con instrucciones
3. Abre Pull Request

---

## Proceso de Contribución

### Paso 1: Fork y Clone

```bash
# Fork en GitHub
# Luego:
git clone https://github.com/tu-usuario/estilo-lb.git
cd estilo-lb
```

### Paso 2: Crear rama

```bash
# Desde main
git checkout -b feature/descripcion-breve
# O para fixes:
git checkout -b fix/descripcion-breve
```

**Convención de ramas:**
- `feature/nombre` - Nueva funcionalidad
- `fix/nombre` - Corrección
- `docs/nombre` - Documentación
- `example/nombre` - Nuevo ejemplo

### Paso 3: Hacer cambios

- Edita archivos
- Asegúrate que **el código siga Estilo LB**
- Prueba localmente

### Paso 4: Commit

```bash
git add .
git commit -m "feat: descripción clara de cambios"
```

**Formato de mensaje:**
- `feat:` Nueva funcionalidad
- `fix:` Corrección
- `docs:` Cambios de documentación
- `example:` Nuevo ejemplo
- `refactor:` Mejora de código

### Paso 5: Push y Pull Request

```bash
git push origin feature/descripcion-breve
```

Luego en GitHub:
1. Click en **Compare & pull request**
2. Describe los cambios
3. Click en **Create pull request**

---

## Guía de Estilo para Contribuyentes

### Documentación

- Usa Markdown limpio
- Títulos con `#` (H1), `##` (H2), etc.
- Código en bloques ``` con lenguaje especificado
- Listas con `-` o números
- Links descriptivos: `[texto](url)`

### Ejemplos de Código

- Deben compilar/ejecutarse correctamente
- Incluir comentarios explicativos
- Seguir Estilo LB
- Mostrar ✅ correcto y ❌ incorrecto cuando sea posible

### Cambios a Especificación

- Son más restrictivos
- Requieren justificación clara
- Deben votarse o consensuarse
- Documentar cambio de versión

---

## Checklist Antes de Pull Request

- [ ] ¿El código/documentación sigue Estilo LB?
- [ ] ¿Está probado?
- [ ] ¿Tiene comentarios claros?
- [ ] ¿La rama tiene nombre descriptivo?
- [ ] ¿El commit message es claro?
- [ ] ¿Actualicé la documentación relacionada?

---

## Preguntas Frecuentes

### ¿Necesito permiso para contribuir?
No, es un proyecto abierto. Haz un fork y contribuye.

### ¿Mi sugerencia será aceptada?
Depende de si alinea con los objetivos de Estilo LB. Abre un Issue primero para discutir.

### ¿Hay requisitos de calidad?
Sí, los cambios deben:
- Seguir Estilo LB
- Ser claros y bien documentados
- No romper ejemplos existentes
- Ser útiles para la comunidad

### ¿Cuánto tiempo tarda la revisión?
Variado según complejidad. Usualmente 3-7 días.

---

## Contacto

- **Issues:** [GitHub Issues](https://github.com/luis-blacio/estilo-lb/issues)
- **Autor:** Luis Blacio
- **Email:** [Tu email]

¡Gracias por contribuir! 🎉
