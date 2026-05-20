package sv.edu.udb.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class EmpleadoRequest {
    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;

    @NotBlank(message = "El apellido no puede estar vacío")
    private String apellido;

    @NotBlank(message = "La identificación (DUI) es obligatoria")
    @Pattern(regexp = "^\\d{8}-\\d{1}$", message = "Formato de DUI no válido (########-#)")
    private String identificacion;

    private String direccion;

    @NotBlank(message = "El tipo (DOCENTE/ADMINISTRATIVO) es obligatorio")
    private String tipo;

    @Positive(message = "El salario debe ser mayor a cero")
    private Double salarioBaseVigente;
}