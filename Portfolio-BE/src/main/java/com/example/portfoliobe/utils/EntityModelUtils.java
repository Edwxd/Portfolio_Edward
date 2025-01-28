package com.example.portfoliobe.utils;

import com.example.portfoliobe.Biographysubdomain.datalayer.Biography;
import com.example.portfoliobe.Biographysubdomain.presentationlayer.BiographyRequestModel;
import com.example.portfoliobe.Biographysubdomain.presentationlayer.BiographyResponseModel;
import org.springframework.beans.BeanUtils;

public class EntityModelUtils {

    public static BiographyResponseModel toBiographyResponseModel(Biography biography) {
        BiographyResponseModel biographyResponseModel = new BiographyResponseModel();
        BeanUtils.copyProperties(biography, biographyResponseModel);
        biographyResponseModel.setName(biography.getName());
        biographyResponseModel.setDescription(biography.getDescription());
        biographyResponseModel.setEmail(biography.getEmail());
        biographyResponseModel.setPhoneNumber(biography.getPhoneNumber());
        biographyResponseModel.setAddress(biography.getAddress());
        biographyResponseModel.setImageUrl(biography.getImageUrl());
        biographyResponseModel.setGithubUrl(biography.getGithubUrl());
        biographyResponseModel.setLinkedinUrl(biography.getLinkedinUrl());
        return biographyResponseModel;
    }

    public static Biography toBiographyEntity(BiographyRequestModel biographyRequestModel){

    return Biography.builder()
            .name(biographyRequestModel.getName())
            .description(biographyRequestModel.getDescription())
            .email(biographyRequestModel.getEmail())
            .phoneNumber(biographyRequestModel.getPhoneNumber())
            .address(biographyRequestModel.getAddress())
            .imageUrl(biographyRequestModel.getImageUrl())
            .githubUrl(biographyRequestModel.getGithubUrl())
            .linkedinUrl(biographyRequestModel.getLinkedinUrl())
            .build();

    }

}
