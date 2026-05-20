package sv.edu.udb.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.edu.udb.dto.request.EmpleadoRequest;
import sv.edu.udb.dto.response.EmpleadoResponse;
import sv.edu.udb.entity.Empleado;
import sv.edu.udb.repository.EmpleadoRepository;
import sv.edu.udb.service.IEmpleadoService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmpleadoServiceImpl implements IEmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Override
    public EmpleadoResponse guardarEmpleado(EmpleadoRequest request) {
        // Validación anti-duplicados por documento de identificación
        if (empleadoRepository.existsByIdentificacion(request.getIdentificacion())) {
            throw new RuntimeException("Error: Ya existe un empleado registrado con la identificación: " + request.getIdentificacion());
        }

        Empleado empleado = new Empleado();
        this.mapToEntity(empleado, request);
        Empleado guardado = empleadoRepository.save(empleado);
        return mapToResponse(guardado);
    }

    @Override
    public List<EmpleadoResponse> listarTodos() {
        return empleadoRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // --- MÉTODOS QUE PROBABLEMENTE TE FALTAN Y CAUSAN EL ERROR ---

    @Override
    public EmpleadoResponse obtenerPorId(Long id) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado con ID: " + id));
        return mapToResponse(empleado);
    }

    @Override
    public EmpleadoResponse actualizarEmpleado(Long id, EmpleadoRequest request) {
        Empleado empleado = empleadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        
        this.mapToEntity(empleado, request);
        Empleado actualizado = empleadoRepository.save(empleado);
        return mapToResponse(actualizado);
    }

    @Override
    public void eliminarEmpleado(Long id) {
        if (!empleadoRepository.existsById(id)) {
            throw new RuntimeException("No se puede eliminar: Empleado no existe");
        }
        empleadoRepository.deleteById(id);
    }

    // --- MÉTODOS AUXILIARES DE MAPEOS ---

    private void mapToEntity(Empleado empleado, EmpleadoRequest request) {
        empleado.setNombre(request.getNombre());
        empleado.setApellido(request.getApellido());
        empleado.setIdentificacion(request.getIdentificacion());
        empleado.setDireccion(request.getDireccion());
        empleado.setTipo(request.getTipo());
        empleado.setSalarioBaseVigente(request.getSalarioBaseVigente());
    }

    private EmpleadoResponse mapToResponse(Empleado e) {
        EmpleadoResponse res = new EmpleadoResponse();
        res.setId_empleado(e.getId_empleado());
        res.setNombre(e.getNombre());
        res.setApellido(e.getApellido());
        res.setIdentificacion(e.getIdentificacion());
        res.setTipo(e.getTipo());
        res.setSalarioBaseVigente(e.getSalarioBaseVigente());
        res.setNombreCompleto(e.getNombre() + " " + e.getApellido());
        return res;
    } 
}