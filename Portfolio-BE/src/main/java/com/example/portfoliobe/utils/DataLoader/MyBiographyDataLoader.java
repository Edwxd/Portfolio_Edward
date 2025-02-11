package com.example.portfoliobe.utils.DataLoader;

import com.example.portfoliobe.Biographysubdomain.datalayer.Biography;
import com.example.portfoliobe.Biographysubdomain.datalayer.BiographyRepository;
import com.example.portfoliobe.Biographysubdomain.presentationlayer.BiographyRequestModel;
import com.example.portfoliobe.Commentssubdomain.datalayer.CommentIdentifier;
import com.example.portfoliobe.Commentssubdomain.datalayer.CommentStatus;
import com.example.portfoliobe.Commentssubdomain.datalayer.Comments;
import com.example.portfoliobe.Commentssubdomain.datalayer.CommentsRepository;
import com.example.portfoliobe.Projectssubdomain.datalayer.ProjectIdentifier;
import com.example.portfoliobe.Projectssubdomain.datalayer.Projects;
import com.example.portfoliobe.Projectssubdomain.datalayer.ProjectsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.ZonedDateTime;
import java.util.UUID;

@Service
public class MyBiographyDataLoader implements CommandLineRunner {

    @Autowired
    private BiographyRepository biographyRepository;

    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private ProjectsRepository projectsRepository;

    @Override
    public void run(String... args) throws Exception {

        Biography biography = Biography.builder()
                .name("Edward Nasser")
                .email("nasser.edward1@gmail.com")
                .phoneNumber("438-350-0368")
                .address("McMasterville, Quebec, Canada")
                .imageUrl("https://res.cloudinary.com/dpiuumhyr/image/upload/v1738097157/edwardnasser_k0j3ko.jpg")
                .description("Hello, my name is Edward, and welcome to my portfolio. " +
                        "Before going into my current state and where I am now, let me tell you more about myself. " +
                        "I live in Canada, more specifically in McMasterville on the south shore, and honestly, if I go back 5 years to my last year of high school, I never expect to end up in computer science. " +
                        "I never saw myself in anything, to be honest. I had a passion for music and gaming, but we all know that only a small percentage of people can make a career out of it. " +
                        "I had to find something, and it wasn’t easy since I didn’t take any advanced math and science classes, as I wasn’t even that good at math either. " +
                        "Now from what I am telling you, it looks like I am a complete bum, but I was doing good at school overall. I just didn’t see my future yet. Had no idea what to do, where to go, and didn’t know where I saw myself in 5 years. " +
                        "While looking for a program, I landed on the 3-year computer science program at Champlain-Saint Lambert that didn’t require advanced math or science, and this program would bring me hands-on experience with the computer science program. " +
                        "So I applied and got into the program, and for the past 4 years, I have been studying and gained a huge liking for the computer science world, especially coding and PC components and building. During my educational parcours, I have gained " +
                        "knowledge on different aspects of the technology industry, such as networking and web security, IT, working with databases, working with computer parts and being able to configure and maintain them, game development, and mainly learning full-stack development with various languages " +
                        "such as C#, Python, PHP, and mainly Java for the back end and JavaScript, TypeScript, and HTML. I have worked on many projects. Some are bigger than others. If you want to access my project, you can go ahead and go to my projects page. Thank you for taking a look at my portfolio. " +
                        "Leave a comment in the comments section or contact me directly through the email at the bottom.")
                .githubUrl("https://github.com/Edwxd")
                .linkedinUrl("https://www.linkedin.com/in/edward-nasser-97616a298/")
                .build();


        Comments comments1 = Comments.builder()
                .commentIdentifier(new CommentIdentifier())
                .name("Erik St-Louis")
                .email("erik99@gmail.com")
                .comment("Love your work. Keep it up!")
                .commentStatus(CommentStatus.COMMENT_REVIEW)
                .build();

        Comments comments2 = Comments.builder()
                .commentIdentifier(new CommentIdentifier())
                .name("David Hall")
                .email("DavidH@gmail.com")
                .comment("Would love to work with you in the future. Good work!")
                .commentStatus(CommentStatus.COMMENT_REVIEW)
                .build();

        Comments comments3 = Comments.builder()
                .commentIdentifier(new CommentIdentifier())
                .name("Jackie Smith")
                .email("JS29@gmail.com")
                .comment("Good work!")
                .commentStatus(CommentStatus.COMMENT_REVIEW)
                .build();

        Comments comments4 = Comments.builder()
                .commentIdentifier(new CommentIdentifier())
                .name("Bob Williams")
                .email("BWilliams@gmail.com")
                .comment("Love the work!")
                .commentStatus(CommentStatus.COMMENT_REVIEW)
                .build();

        Comments comments5 = Comments.builder()
                .commentIdentifier(new CommentIdentifier())
                .name("David Hall")
                .email("DavidH@gmail.com")
                .comment("Keep going with the good work!")
                .commentStatus(CommentStatus.COMMENT_REVIEW)
                .build();


        Projects project1 = Projects.builder()
                .projectIdentifier(new ProjectIdentifier())
                .name("League Alerts, Article Web Application")
                .description("Collaborated in a team of 4-5 students to develop an article management system from scratch for a client.\n" +
                        "Implemented features allowing authors to perform CRUD operations on articles, and users to read, share,\n" +
                        "like, and comment on content.")
                .technologies("Java, React.js, HTML, CSS, JavaScript, MongoDB, Jira, GitHub, Agile/Scrum, Postman, Docker")
                .startDate("September 2024")
                .endDate("February 2025")
                .projectShowcase("")
                .projectRepository("https://github.com/Valthefirst/league_alerts-ChamplainECP")
                .build();

        Projects project2 = Projects.builder()
                .projectIdentifier(new ProjectIdentifier())
                .name("Pet Clinic SCRUM Project: Veterinarian Clinic Management Application")
                .description("Contributed to a large-scale project involving 7 teams, each responsible for specific services.\n" +
                        "Focused on the Veterinarian Management service, overseeing CRUD operations for veterinarian profiles.")
                .technologies("Java, React.js, HTML, JavaScript, CSS, TypeScript, MongoDB, PostgreSql, Jira, GitHub, Agile/Scrum, Postman, Docker")
                .startDate("September 2024")
                .endDate("October 2025")
                .projectShowcase("")
                .projectRepository("https://github.com/cgerard321/champlain_petclinic")
                .build();


        Projects project3 = Projects.builder()
                .projectIdentifier(new ProjectIdentifier())
                .name("Photo Online Printing Web Application: Microservice Application")
                .description("Independently developed the full back-end of a photo-ordering service, handling CRUD operations for\n" +
                        "customer orders.")
                .technologies("Java, MySQL, GitHub, N-Tier Architecture, Postman, Docker")
                .startDate("January 2024")
                .endDate("May 2024")
                .projectShowcase("")
                .projectRepository("https://github.com/Edwxd/PhotoOnlineWebAppMs")
                .build();


        Projects project4 = Projects.builder()
                .projectIdentifier(new ProjectIdentifier())
                .name("Project Alien: OpenWorld 2D Top Down Survival Game")
                .description("In teams of two, create a game from scratch using all knowledge learned throughout the course, such as\n" +
                        "tilemaps, gameobjects, raycasting, animated tiles, animation, scripting, and more.\n" +
                        "Game is still in development as I am trying to gain more experience in this field.")
                .technologies("C#, Unity, Unity Version Control")
                .startDate("February 2024")
                .endDate("On Going")
                .projectShowcase("")
                .projectRepository("https://github.com/Edwxd/Project-Alien")
                .build();



        Flux.just(biography)
                .flatMap(biographyRepository::insert)
                .log()
                .subscribe();

        Flux.just(comments1, comments2, comments3, comments4, comments5)
                .flatMap(commentsRepository::insert)
                .log()
                .subscribe();

        Flux.just(project1, project2, project3, project4)
                .flatMap(projectsRepository::insert)
                .log()
                .subscribe();


     }




}
