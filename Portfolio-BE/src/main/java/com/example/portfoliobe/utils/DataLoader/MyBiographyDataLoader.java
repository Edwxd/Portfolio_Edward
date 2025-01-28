package com.example.portfoliobe.utils.DataLoader;

import com.example.portfoliobe.Biographysubdomain.datalayer.Biography;
import com.example.portfoliobe.Biographysubdomain.datalayer.BiographyRepository;
import com.example.portfoliobe.Biographysubdomain.presentationlayer.BiographyRequestModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.ZonedDateTime;

@Service
public class MyBiographyDataLoader implements CommandLineRunner {

    @Autowired
    private BiographyRepository biographyRepository;

    @Override
    public void run(String... args) throws Exception {

        Biography biography = Biography.builder()
                .name("Edward Nasser")
                .email("nasser.edward1@gmail.com")
                .phoneNumber("438-350-0368")
                .imageUrl("https://res.cloudinary.com/dpiuumhyr/image/upload/v1738097157/edwardnasser_k0j3ko.jpg")
                .description("")
                .githubUrl("https://github.com/Edwxd")
                .linkedinUrl("https://www.linkedin.com/in/edward-nasser-97616a298/")
                .build();

     }

}
