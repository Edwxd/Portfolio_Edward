package com.example.portfoliobe.Biographysubdomain.buisnesslayer;

import com.example.portfoliobe.Biographysubdomain.presentationlayer.BiographyResponseModel;
import reactor.core.publisher.Mono;

public interface BiographyService {

    Mono<BiographyResponseModel>getMyBiography(String biographyId);

    Mono<BiographyResponseModel> updateBiography(String biographyId, BiographyResponseModel biographyRequestModel);


}
