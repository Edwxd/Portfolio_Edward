package com.example.portfoliobe.Biographysubdomain.buisnesslayer;

import com.example.portfoliobe.Biographysubdomain.presentationlayer.BiographyRequestModel;
import com.example.portfoliobe.Biographysubdomain.presentationlayer.BiographyResponseModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface BiographyService {

    Flux<BiographyResponseModel> getMyBiography();

    Mono<BiographyResponseModel> getBiographyById(String biographyId);

    Mono<BiographyResponseModel> updateBiography(String biographyId, BiographyRequestModel biographyRequestModel);


}
