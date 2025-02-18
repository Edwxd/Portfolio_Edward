package com.example.portfoliobe.Biographysubdomain.presentationlayer;

import com.example.portfoliobe.Biographysubdomain.buisnesslayer.BiographyService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/v1/biography")
//@CrossOrigin(origins = "https://portfolioedward-production.up.railway.app")
//@CrossOrigin(origins = "http://localhost:3000")
public class BiographyController {

    private final BiographyService biographyService;

    public BiographyController(BiographyService biographyService) {
        this.biographyService = biographyService;
    }

    @GetMapping(value = "", produces= MediaType.APPLICATION_JSON_VALUE)
    public Flux<BiographyResponseModel> getMyBiography() {
        return biographyService.getMyBiography();

    }

    @GetMapping(value = "/{bioId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<BiographyResponseModel> getBiographyById(@PathVariable String bioId) {
        return biographyService.getBiographyById(bioId);
    }

    @PutMapping(value = "/{bioId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<BiographyResponseModel> updateBiography(@PathVariable String bioId, @RequestBody BiographyRequestModel biographyRequestModel) {
        return biographyService.updateBiography(bioId, biographyRequestModel);
    }

}
