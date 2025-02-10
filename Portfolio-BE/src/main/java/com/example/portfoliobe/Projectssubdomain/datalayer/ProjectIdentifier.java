package com.example.portfoliobe.Projectssubdomain.datalayer;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.util.UUID;

@Embeddable
@Getter
public class ProjectIdentifier {

    private String projectIdentifier;



    public ProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public ProjectIdentifier() {
        this.projectIdentifier = UUID.randomUUID().toString();
    }

}
