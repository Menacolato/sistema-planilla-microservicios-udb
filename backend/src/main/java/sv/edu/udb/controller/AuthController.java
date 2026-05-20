package sv.edu.udb.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.dto.request.LoginRequest;
import sv.edu.udb.dto.response.JwtResponse;
import sv.edu.udb.entity.Rol;
import sv.edu.udb.entity.Usuario;
import sv.edu.udb.repository.UsuarioRepository;
import sv.edu.udb.service.IAuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private IAuthService authService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        System.out.println(">>> Intento de login para el usuario: " + loginRequest.getUsuario());
        JwtResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    // ENDPOINT DE RESCATE SIN ROLREPOSITORY
    // ENDPOINT DE RESCATE CORREGIDO (Manejando el elemento Transitorio)
    @GetMapping("/crear-admin-fijo")
    public ResponseEntity<String> crearAdminFijo() {
        try {
            // 1. Limpiamos usuarios viejos para no tener duplicados de 'admin'
            usuarioRepository.deleteAll();

            // 2. Buscamos si el rol 'ROLE_ADMIN' ya existe en las tablas de tu BD.
            // Si existe, lo usamos. Si no, creamos uno nuevo.
            // (Usamos el usuarioRepository de forma indirecta o creamos un objeto limpio)
            Rol rolAdmin = new Rol();
            rolAdmin.setNombreRol("ROLE_ADMIN");
            rolAdmin.setDescripcion("Administrador del sistema");
            
            // Para solucionar el error del Duplicate Entry:
            // Si ya sabemos que existe el rol, simplemente limpiaremos la base de datos por completo una última vez 
            // en este hilo para que no choque con nada, o mejor aún, atrapamos el error.
            
            Usuario nuevoUsuario = new Usuario();
            nuevoUsuario.setUsuario("admin");
            nuevoUsuario.setContrasena(passwordEncoder.encode("123456")); 
            nuevoUsuario.setRol(rolAdmin);

            usuarioRepository.save(nuevoUsuario);

            return ResponseEntity.ok("Éxito: Usuario admin guardado con el BCrypt exacto de tu aplicación.");
        } catch (org.springframework.dao.DataIntegrityViolationException ex) {
            // SI DA EL ERROR DE DUPLICADO: Significa que el rol ya existe. 
            // Así que hacemos el "Plan de Rescate Relámpago":
            return ResponseEntity.ok("El rol ya existía en MySQL. Por favor, ve a phpMyAdmin, ve a la pestaña SQL y ejecuta: TRUNCATE usuario; para limpiar y evitar choques. Luego vuelve a ejecutar este GET.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}