package com.example.portfoliobe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.actuate.autoconfigure.metrics.MetricsAutoConfiguration;
import org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration;
import org.springframework.boot.actuate.autoconfigure.metrics.export.simple.SimpleMetricsExportAutoConfiguration;

@SpringBootApplication(exclude = {
        MetricsAutoConfiguration.class,
        SystemMetricsAutoConfiguration.class,
        SimpleMetricsExportAutoConfiguration.class
})
public class PortfolioBeApplication {
    public static void main(String[] args) {
        SpringApplication.run(PortfolioBeApplication.class, args);
    }
}