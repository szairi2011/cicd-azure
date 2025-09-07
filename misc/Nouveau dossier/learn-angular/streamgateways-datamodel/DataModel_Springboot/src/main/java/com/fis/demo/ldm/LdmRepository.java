package com.fis.demo.ldm;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fis.demo.ldm.entity.LDM_DATAMODEL;
import com.fis.demo.ldm.entity.LDM_DatamodelCV_Client;
import com.fis.demo.ldm.entity.LDM_DatamodelCV_Full;
import com.fis.demo.ldm.entity.LDM_DatamodelSA_Client;
import com.fis.demo.ldm.entity.LDM_DatamodelSA_Full;



@Repository
public interface LdmRepository extends JpaRepository<LDM_DATAMODEL, Integer> {

	@Query(value = "SELECT SGWPK_ID,SGW_API_MODEL,SGW_API_ATTRIBUTE,SGW_API_TYPE,SGW_API_ISMANDATORY,SGW_API_FUNCT_DESC,SGW_API_IMPL_DESC,SGW_API_INTERNAL_FLEXI,CV_CURRENT_CONSTRAINTS,CV_FIX_RULES,CV_CV_AUDIT,CV_MARKETWATCH,CV_FIXTAG,CV_FIXTAG_NAME,CV_FORMAT,CLIENT_FIXML_PATH,CLIENT_FIXML_FIELD,CLIENT_TECHINCAL_COMMENTS,MAP_FILTER_MODEL,MAP_ROW_TYPE from LDM_DATAMODEL  where MAP_FILTER_MODEL IN (0,:validation_model)", nativeQuery = true)
	List<LDM_DatamodelCV_Full> getLDM_CVFull(@Param("validation_model")Integer validation_model);
	
	@Query(value = "SELECT SGWPK_ID,SGW_API_MODEL,SGW_API_ATTRIBUTE,CV_FIXTAG,CV_FORMAT,CLIENT_FIXML_PATH,CLIENT_FIXML_FIELD,CLIENT_TECHINCAL_COMMENTS,MAP_FILTER_MODEL,MAP_ROW_TYPE from LDM_DATAMODEL where MAP_FILTER_MODEL IN (0,:validation_model)", nativeQuery = true)
	List<LDM_DatamodelCV_Client> getLDM_CVclient(@Param("validation_model")Integer validation_model);
	
	@Query(value = "SELECT SGWPK_ID,SGW_API_MODEL,SGW_API_ATTRIBUTE,SGW_API_TYPE,SGW_API_ISMANDATORY,SGW_API_FUNCT_DESC,SGW_API_IMPL_DESC,SGW_API_INTERNAL_FLEXI,SA_FIXML_MAPPING,SA_FORMAT,CLIENT_FIXML_PATH,CLIENT_FIXML_FIELD,CLIENT_TECHINCAL_COMMENTS,MAP_FILTER_MODEL,MAP_ROW_TYPE from LDM_DATAMODEL  where MAP_FILTER_MODEL IN (0,:validation_model)", nativeQuery = true)
	List<LDM_DatamodelSA_Full> getLDM_SAFull(@Param("validation_model")Integer validation_model);
	
	@Query(value = "SELECT SGWPK_ID,SGW_API_MODEL,SGW_API_ATTRIBUTE,SA_FIXML_MAPPING,SA_FORMAT,CLIENT_FIXML_PATH,CLIENT_FIXML_FIELD,CLIENT_TECHINCAL_COMMENTS,MAP_FILTER_MODEL,MAP_ROW_TYPE from LDM_DATAMODEL where MAP_FILTER_MODEL IN (0,:validation_model) ", nativeQuery = true)
	List<LDM_DatamodelSA_Client> getLDM_SAclient(@Param("validation_model")Integer validation_model);

}
