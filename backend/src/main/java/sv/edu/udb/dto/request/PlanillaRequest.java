package sv.edu.udb.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PlanillaRequest {
    @NotNull(message = "El ID del empleado es necesario")
    private Long idEmpleado;

    @NotBlank(message = "El periodo es obligatorio (ej: 03-2026)")
    private String periodo;
    
}