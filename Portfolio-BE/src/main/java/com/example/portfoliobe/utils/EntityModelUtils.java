package com.example.portfoliobe.utils;

import com.example.portfoliobe.Biographysubdomain.datalayer.Biography;
import com.example.portfoliobe.Biographysubdomain.presentationlayer.BiographyRequestModel;
import com.example.portfoliobe.Biographysubdomain.presentationlayer.BiographyResponseModel;
import com.example.portfoliobe.Commentssubdomain.datalayer.CommentIdentifier;
import com.example.portfoliobe.Commentssubdomain.datalayer.Comments;
import com.example.portfoliobe.Commentssubdomain.presentation.CommentsRequestModel;
import com.example.portfoliobe.Commentssubdomain.presentation.CommentsResponseModel;
import com.example.portfoliobe.Projectssubdomain.datalayer.ProjectIdentifier;
import com.example.portfoliobe.Projectssubdomain.datalayer.Projects;
import com.example.portfoliobe.Projectssubdomain.presentationlayer.ProjectsRequestModel;
import com.example.portfoliobe.Projectssubdomain.presentationlayer.ProjectsResponseModel;
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



    public static Comments toCommentsEntity(CommentsRequestModel commentsRequestModel){
        return Comments.builder()
                .commentIdentifier(new CommentIdentifier())
                .name(commentsRequestModel.getComment())
                .email(commentsRequestModel.getEmail())
                .name(commentsRequestModel.getName())
                .build();
    }

    public static CommentsResponseModel toCommentsResponseModel(Comments comments){
        CommentsResponseModel commentsResponseModel = new CommentsResponseModel();
        BeanUtils.copyProperties(comments, commentsResponseModel);
        commentsResponseModel.setCommentIdentifier(comments.getCommentIdentifier().getCommentId());
        commentsResponseModel.setName(comments.getName());
        commentsResponseModel.setEmail(comments.getEmail());
        commentsResponseModel.setComment(comments.getComment());
        return commentsResponseModel;
    }

    public static Projects toProjectsEntity(ProjectsRequestModel projectsRequestModel){
        return Projects.builder()
                .projectIdentifier(new ProjectIdentifier())
                .name(projectsRequestModel.getName())
                .description(projectsRequestModel.getDescription())
                .technologies(projectsRequestModel.getTechnologies())
                .startDate(projectsRequestModel.getStartDate())
                .endDate(projectsRequestModel.getEndDate())
                .projectShowcase(projectsRequestModel.getProjectShowcase())
                .projectRepository(projectsRequestModel.getProjectRepository())
                .build();
    }

    public static ProjectsResponseModel toProjectsResponseModel(Projects projects){
        ProjectsResponseModel projectsResponseModel = new ProjectsResponseModel();
        BeanUtils.copyProperties(projects, projectsResponseModel);
        projectsResponseModel.setProjectId(projects.getProjectIdentifier().getProjectId());
        projectsResponseModel.setName(projects.getName());
        projectsResponseModel.setDescription(projects.getDescription());
        projectsResponseModel.setTechnologies(projects.getTechnologies());
        projectsResponseModel.setStartDate(projects.getStartDate());
        projectsResponseModel.setEndDate(projects.getEndDate());
        projectsResponseModel.setProjectShowcase(projects.getProjectShowcase());
        projectsResponseModel.setProjectRepository(projects.getProjectRepository());
        return projectsResponseModel;
    }



}
