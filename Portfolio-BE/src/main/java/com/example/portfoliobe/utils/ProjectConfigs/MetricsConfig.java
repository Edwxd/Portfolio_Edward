package com.example.portfoliobe.utils.ProjectConfigs;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MetricsConfig {

    @Bean
    public static BeanFactoryPostProcessor removeProblemBeans() {
        return new BeanFactoryPostProcessor() {
            @Override
            public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
                if (beanFactory instanceof DefaultListableBeanFactory) {
                    DefaultListableBeanFactory defaultListableBeanFactory = (DefaultListableBeanFactory) beanFactory;
                    if (defaultListableBeanFactory.containsBeanDefinition("processorMetrics")) {
                        defaultListableBeanFactory.removeBeanDefinition("processorMetrics");
                    }
                } else {
                    // Alternative approach if we can't cast to DefaultListableBeanFactory
                    if (beanFactory.containsBeanDefinition("processorMetrics")) {
                        try {
                            // Try to get the bean definition and modify it to be "not eligible for autowiring"
                            BeanDefinition definition = beanFactory.getBeanDefinition("processorMetrics");
                            definition.setAutowireCandidate(false);
                        } catch (Exception e) {
                            // Log the exception but continue
                            System.err.println("Could not modify processorMetrics bean: " + e.getMessage());
                        }
                    }
                }
            }
        };
    }
}