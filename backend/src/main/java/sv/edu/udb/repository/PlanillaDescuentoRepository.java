package sv.edu.udb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sv.edu.udb.entity.PlanillaDescuento;

@Repository
public interface PlanillaDescuentoRepository extends JpaRepository<PlanillaDescuento, Long> {
}