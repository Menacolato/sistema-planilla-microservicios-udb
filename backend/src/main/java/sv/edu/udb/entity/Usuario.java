package sv.edu.udb.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuario") // En minúsculas para mantener consistencia con tus logs de Hibernate
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;

    @Column(nullable = false, unique = true, length = 50)
    private String usuario;

    @Column(nullable = false, length = 255)
    private String contrasena; 

    // SOLUCIÓN AQUÍ: Agregamos PERSIST y MERGE para que Hibernate guarde el rol 
    // automáticamente si es nuevo, o lo enlace si ya existe en la DB.
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rol;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_empleado", nullable = true)
    private Empleado empleado;
}