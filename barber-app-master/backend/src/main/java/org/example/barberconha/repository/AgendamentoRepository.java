package org.example.barberconha.repository;

import org.example.barberconha.model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    boolean existsByDiaAndHora(String dia, String hora);
}
