package com.daq.domain.mapper;

import com.daq.domain.entity.FormApply;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author zhanghc
 * @since 2022-11-20
 */

@Mapper
public interface FormApplyMapper {

    @Select("select * from form_apply where title=#{title}")
    FormApply getFormApplyByTitle(String title);

    @Select("select * from form_apply where id=#{id}")
    FormApply getFormApplyById(int id);


    @Select("select title from form_apply")
    List<String> getAllFormTypes();

}
