package com.example.portfoliobe.utils.ProjectConfigs;

import org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.micrometer.core.instrument.binder.system.ProcessorMetrics;
import io.micrometer.core.instrument.binder.system.FileDescriptorMetrics;
import io.micrometer.core.instrument.binder.system.UptimeMetrics;
import io.micrometer.core.instrument.binder.MeterBinder;
import io.micrometer.core.instrument.MeterRegistry;

@Configuration
@AutoConfigureBefore(SystemMetricsAutoConfiguration.class)
public class MetricsConfig {

    @Bean
    public MeterBinder processorMetrics() {
        // Return a MeterBinder that does nothing
        return new MeterBinder() {
            @Override
            public void bindTo(MeterRegistry registry) {
                // Do nothing
            }
        };
    }

    @Bean
    public MeterBinder fileDescriptorMetrics() {
        // Return a MeterBinder that does nothing
        return new MeterBinder() {
            @Override
            public void bindTo(MeterRegistry registry) {
                // Do nothing
            }
        };
    }

    @Bean
    public MeterBinder uptimeMetrics() {
        // Create a simple implementation that doesn't use cgroups
        return new MeterBinder() {
            @Override
            public void bindTo(MeterRegistry registry) {
                // Add a simple uptime gauge that just returns the JVM uptime
                registry.gauge("process.uptime",
                        Math.round(System.currentTimeMillis() / 1000.0 -
                                java.lang.management.ManagementFactory.getRuntimeMXBean().getStartTime() / 1000.0));
            }
        };
    }
}