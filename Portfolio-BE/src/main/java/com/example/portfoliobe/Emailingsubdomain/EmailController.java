package com.example.portfoliobe.Emailingsubdomain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "https://portfolioedwardfe-production.up.railway.app")
//@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {
    @Autowired
    private EmailSenderService senderService;

    @GetMapping("/api/v1/send-email")
    public Mono<String> sendEmail(@RequestParam String to,@RequestParam String from,  @RequestParam String subject, @RequestParam String body) {
        return senderService.sendEmail(to,from, subject, body)
                .then(Mono.just("Email sent successfully"))
                .onErrorResume(e -> {
                    e.printStackTrace();
                    return Mono.just("Failed to send email: " + e.getMessage());
                });
    }

}