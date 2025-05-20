package com.example.portfoliobe.utils;

import org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;

@Configuration
@AutoConfigureBefore(SystemMetricsAutoConfiguration.class)
@ConditionalOnProperty(name = "custom.metrics.processor.disabled", havingValue = "true")
public class CustomMetricsConfig {
    // Empty config to disable the default ProcessorMetrics
}