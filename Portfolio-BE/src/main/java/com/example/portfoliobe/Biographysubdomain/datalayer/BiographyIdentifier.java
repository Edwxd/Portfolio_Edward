package com.example.portfoliobe.Biographysubdomain.datalayer;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.util.UUID;


@Getter
@Embeddable
public class BiographyIdentifier {
    public String biographyId;

    public BiographyIdentifier(String biographyId) {
        this.biographyId = biographyId;
    }


    public BiographyIdentifier(){

        this.biographyId = UUID.randomUUID().toString();
    }
}