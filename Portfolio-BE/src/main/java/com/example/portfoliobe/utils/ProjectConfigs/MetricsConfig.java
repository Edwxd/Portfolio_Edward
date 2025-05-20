package com.example.portfoliobe.utils.ProjectConfigs;

import org.springframework.boot.actuate.autoconfigure.metrics.SystemMetricsAutoConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import io.micrometer.core.instrument.binder.MeterBinder;
import io.micrometer.core.instrument.MeterRegistry;

@Configuration
@AutoConfigureBefore(SystemMetricsAutoConfiguration.class)
public class MetricsConfig {

    @Bean
    @Primary
    public MeterBinder customProcessorMetrics() {
        return new MeterBinder() {
            @Override
            public void bindTo(MeterRegistry registry) {
                // Do nothing
            }
        };
    }

    @Bean
    @Primary
    public MeterBinder customFileDescriptorMetrics() {
        return new MeterBinder() {
            @Override
            public void bindTo(MeterRegistry registry) {
                // Do nothing
            }
        };
    }

    @Bean
    @Primary
    public MeterBinder customUptimeMetrics() {
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