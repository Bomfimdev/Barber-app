package org.example.barberconha.controller;

import org.example.barberconha.model.Agendamento;
import org.example.barberconha.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    // Endpoint para agendar
    @PostMapping("/agendar")
    public ResponseEntity<String> agendar(@RequestBody Agendamento agendamento) {
        // Verifica se o horário no dia específico já está agendado
        if (agendamentoRepository.existsByDiaAndHora(agendamento.getDia(), agendamento.getHora())) {
            return ResponseEntity.badRequest().body("Horário não disponível para o dia " + agendamento.getDia() + ".");
        }

        // Salva o agendamento
        agendamentoRepository.save(agendamento);
        return ResponseEntity.ok("Agendamento confirmado para " + agendamento.getNome() + " no dia " + agendamento.getDia() + " às " + agendamento.getHora() + ".");
    }


    // Endpoint para listar agendamentos
    @GetMapping
    public ResponseEntity<List<Agendamento>> listarAgendamentos() {
        List<Agendamento> agendamentos = agendamentoRepository.findAll();
        return ResponseEntity.ok(agendamentos);
    }
}
