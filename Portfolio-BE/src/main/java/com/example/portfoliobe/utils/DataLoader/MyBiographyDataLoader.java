package com.example.portfoliobe.utils.DataLoader;

import com.example.portfoliobe.Biographysubdomain.datalayer.Biography;
import com.example.portfoliobe.Biographysubdomain.datalayer.BiographyRepository;
import com.example.portfoliobe.Biographysubdomain.presentationlayer.BiographyRequestModel;
import com.example.portfoliobe.Commentssubdomain.datalayer.CommentIdentifier;
import com.example.portfoliobe.Commentssubdomain.datalayer.Comments;
import com.example.portfoliobe.Commentssubdomain.datalayer.CommentsRepository;
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
                .commentId(new CommentIdentifier())
                .name("Erik St-Louis")
                .email("erik99@gmail.com")
                .comment("Love your work. Keep it up!")
                .build();

        Comments comments2 = Comments.builder()
                .commentId(new CommentIdentifier())
                .name("David Hall")
                .email("DavidH@gmail.com")
                .comment("Would love to work with you in the future. Good work!")
                .build();






        Flux.just(biography)
                .flatMap(biographyRepository::insert)
                .log()
                .subscribe();

        Flux.just(comments1, comments2)
                .flatMap(commentsRepository::insert)
                .log()
                .subscribe();



     }




}
