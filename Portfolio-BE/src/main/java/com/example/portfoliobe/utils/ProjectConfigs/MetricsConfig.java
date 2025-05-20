package com.example.portfoliobe.utils.ProjectConfigs;

import org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.micrometer.core.instrument.binder.system.ProcessorMetrics;
import io.micrometer.core.instrument.binder.system.FileDescriptorMetrics;
import io.micrometer.core.instrument.binder.system.UptimeMetrics;
import io.micrometer.core.instrument.MeterRegistry;

@Configuration
@AutoConfigureBefore(SystemMetricsAutoConfiguration.class)
public class MetricsConfig {

    @Bean
    public ProcessorMetrics processorMetrics() {
        // Return a no-op implementation that won't fail
        return new ProcessorMetrics() {
            @Override
            public void bindTo(MeterRegistry registry) {
                // Do nothing
            }
        };
    }

    @Bean
    public FileDescriptorMetrics fileDescriptorMetrics() {
        // Return a no-op implementation that won't fail
        return new FileDescriptorMetrics() {
            @Override
            public void bindTo(MeterRegistry registry) {
                // Do nothing
            }
        };
    }

    // You might need to override other system metrics as well
    @Bean
    public UptimeMetrics uptimeMetrics() {
        return new UptimeMetrics();
    }
}