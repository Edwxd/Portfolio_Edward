package com.example.portfoliobe.Biographysubdomain.buisnesslayer;

import com.example.portfoliobe.Biographysubdomain.datalayer.BiographyRepository;
import com.example.portfoliobe.Biographysubdomain.presentationlayer.BiographyResponseModel;
import com.example.portfoliobe.utils.EntityModelUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class BiographyServiceImpl implements BiographyService {

    @Autowired
    private BiographyRepository biographyRepository;
    @Override
    public Flux<BiographyResponseModel> getMyBiography() {
        return biographyRepository.findAll()
                .map(EntityModelUtils::toBiographyResponseModel);
    }
    @Override
    public Mono<BiographyResponseModel> updateBiography(String myName, BiographyResponseModel biographyRequestModel) {
        return null;
    }


}
