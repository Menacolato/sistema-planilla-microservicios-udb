package sv.edu.udb.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.edu.udb.dto.request.PlanillaRequest;
import sv.edu.udb.dto.response.PlanillaResponse;
import sv.edu.udb.entity.Empleado;
import sv.edu.udb.entity.Planilla;
import sv.edu.udb.repository.EmpleadoRepository;
import sv.edu.udb.repository.PlanillaRepository;
import sv.edu.udb.service.IPlanillaService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanillaServiceImpl implements IPlanillaService {

    @Autowired
    private PlanillaRepository planillaRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Override
    public PlanillaResponse procesarPlanillaEmpleado(PlanillaRequest request) {
        Empleado empleado = empleadoRepository.findById(request.getIdEmpleado())
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado con ID: " + request.getIdEmpleado()));

        double salarioBruto = empleado.getSalarioBaseVigente();

        // Cálculos de ley de El Salvador (AFP 7.25% e ISSS 3%)
        double afp = salarioBruto * 0.0725;
        double isss = salarioBruto * 0.03;
        if (isss > 30.0) { 
            isss = 30.0;
        }

        double totalDescuentos = afp + isss;
        double salarioNeto = salarioBruto - totalDescuentos;

        Planilla planilla = new Planilla();
        planilla.setEmpleado(empleado);
        planilla.setPeriodo(request.getPeriodo());
        planilla.setFechaGeneracion(LocalDate.now()); 
        planilla.setSalarioBruto(salarioBruto);
        planilla.setSalarioNeto(salarioNeto);

        Planilla guardada = planillaRepository.save(planilla);

        return this.mapToResponse(guardada);
    }

    @Override
    public List<PlanillaResponse> listarHistorialPorEmpleado(Long idEmpleado) {
        return planillaRepository.buscarPorIdEmpleado(idEmpleado).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private PlanillaResponse mapToResponse(Planilla p) {
        PlanillaResponse res = new PlanillaResponse();
        
        res.setId_planilla(p.getId_planilla());
        res.setPeriodo(p.getPeriodo());
        res.setSalarioBruto(p.getSalarioBruto());
        res.setSalarioNeto(p.getSalarioNeto());
        res.setFechaGeneracion(p.getFechaGeneracion()); // Pasamos el LocalDate directo sin .toString()

        if (p.getEmpleado() != null) {
            res.setIdEmpleado(p.getEmpleado().getId_empleado());
            res.setNombreEmpleado(p.getEmpleado().getNombre() + " " + p.getEmpleado().getApellido());
        }

        res.setDetallesDescuentos("AFP: 7.25%, ISSS: 3.00%");

        return res;
    }
}