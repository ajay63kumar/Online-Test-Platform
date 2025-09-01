package com.onlinetest.OnlineTestPlatform.configure;

import com.onlinetest.OnlineTestPlatform.dtos.QuestionDTO;
import com.onlinetest.OnlineTestPlatform.model.Question;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
//
//        modelMapper.typeMap(Question.class, QuestionDTO.class).addMappings(mapper -> {
//            mapper.map(src -> List.of(
//                    src.getOption1(),
//                    src.getOption2(),
//                    src.getOption3(),
//                    src.getOption4()
//            ), QuestionDTO::setOptions);
//            mapper.map(Question::getCorrectOption, QuestionDTO::setCorrectAnswer);
//        });
//
//        modelMapper.typeMap(QuestionDTO.class, Question.class).addMappings(mapper -> {
//            mapper.map(src -> src.getOptions().get(0), Question::setOption1);
//            mapper.map(src -> src.getOptions().get(1), Question::setOption2);
//            mapper.map(src -> src.getOptions().get(2), Question::setOption3);
//            mapper.map(src -> src.getOptions().get(3), Question::setOption4);
//            mapper.map(QuestionDTO::getCorrectAnswer, Question::setCorrectOption);
//        });

        modelMapper.getConfiguration()
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
                .setMatchingStrategy(MatchingStrategies.STANDARD);


        return modelMapper;
    }
}
