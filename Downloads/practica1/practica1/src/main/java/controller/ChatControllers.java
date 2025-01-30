package controller;

import models.Mensaje;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import repositories.MensajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


import java.time.LocalDateTime;

@Controller
public class ChatControllers {
    @Autowired
    private MensajeRepository mensajeRepository; // Inyección del repositorio

    @Autowired
    private SimpMessagingTemplate messagingTemplate; // Para enviar mensajes a los clientes


    @MessageMapping("/mensaje")  // Ruta de solicitud del cliente
    public void recibeMensaje(Mensaje mensaje) {
        mensaje.setFechaEnvio(LocalDateTime.now());

        if (mensaje.getUsername() == null || mensaje.getUsername().isEmpty()) {
            mensaje.setUsername("Usuario Anónimo");
        }

        Mensaje mensajeGuardado = mensajeRepository.save(mensaje);

        messagingTemplate.convertAndSend("/chat/mensaje", mensajeGuardado);
    }

}
