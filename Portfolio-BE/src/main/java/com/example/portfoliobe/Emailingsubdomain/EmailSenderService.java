package com.example.portfoliobe.Emailingsubdomain;


import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class EmailSenderService {

    private final JavaMailSender mailSender;

    public EmailSenderService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public Mono<Void> sendEmail(String to, String from, String subject, String body) {
        return Mono.fromRunnable(() -> {

            String fullBody = from + ":\n" + body;
            try {

                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
                helper.setTo(to);
                helper.setFrom(from);
                helper.setSubject(subject);
                helper.setText(fullBody, true);

                mailSender.send(message);
            } catch (Exception e) {
                throw new RuntimeException("Failed to send email to " + to, e);
            }
        }).then();
    }
}
