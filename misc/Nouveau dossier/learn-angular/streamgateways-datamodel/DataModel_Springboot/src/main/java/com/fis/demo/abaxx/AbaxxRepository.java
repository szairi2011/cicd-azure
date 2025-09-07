package com.fis.demo.abaxx;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fis.demo.abaxx.entity.ABAXX_DATAMODEL;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelCV_Client;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelCV_Full;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelFISCD_Client;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelFISCD_Full;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelSA_Client;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelSA_Full;

@Repository
public interface AbaxxRepository extends JpaRepository<ABAXX_DATAMODEL, Integer> {

	@Query(value = "SELECT * from DATA_MODEL_TABLE where CLIENT_DESCRIPTION =:CLIENT_DESCRIPTION", nativeQuery = true)
	List<ABAXX_DATAMODEL> findDataModelCLIENT_DESCRIPTION(@Param("CLIENT_DESCRIPTION") String CLIENT_DESCRIPTION);

	@Query(value = "SELECT SGWPK_ID,SGW_API_MODEL,SGW_API_ATTRIBUTE,SGW_API_TYPE,SGW_API_ISMANDATORY,SGW_API_FUNCT_DESC,SGW_API_IMPL_DESC,SGW_API_INTERNAL_FLEXI,SA_FIXML_MAPPING,SA_FORMAT,CLIENT_FIXML_PATH,CLIENT_FIXML_FIELD,CLIENT_TECHINCAL_COMMENTS,MAP_FILTER_MODEL,MAP_ROW_TYPE from ABAXX_DATAMODEL  where MAP_FILTER_MODEL IN (0,:validation_model)", nativeQuery = true)
	List<ABAXX_DatamodelSA_Full> getABAXX_SAFull(@Param("validation_model") Integer validation_model);

	@Query(value = "SELECT SGWPK_ID,SGW_API_MODEL,SGW_API_ATTRIBUTE,SA_FIXML_MAPPING,SA_FORMAT,CLIENT_FIXML_PATH,CLIENT_FIXML_FIELD,CLIENT_TECHINCAL_COMMENTS,MAP_FILTER_MODEL,MAP_ROW_TYPE from ABAXX_DATAMODEL where MAP_FILTER_MODEL IN (0,:validation_model) ", nativeQuery = true)
	List<ABAXX_DatamodelSA_Client> getABAXX_SAclient(@Param("validation_model") Integer validation_model);

	@Query(value = "SELECT SGWPK_ID,SGW_API_MODEL,SGW_API_ATTRIBUTE,SGW_API_TYPE,SGW_API_ISMANDATORY,SGW_API_FUNCT_DESC,SGW_API_IMPL_DESC,SGW_API_INTERNAL_FLEXI,CV_CURRENT_CONSTRAINTS,CV_FIX_RULES,CV_CV_AUDIT,CV_MARKETWATCH,CV_FIXTAG,CV_FIXTAG_NAME,CV_FORMAT,CLIENT_FIXML_PATH,CLIENT_FIXML_FIELD,CLIENT_TECHINCAL_COMMENTS,MAP_FILTER_MODEL,MAP_ROW_TYPE from ABAXX_DATAMODEL  where MAP_FILTER_MODEL IN (0,:validation_model)", nativeQuery = true)
	List<ABAXX_DatamodelCV_Full> getABAXX_CVFull(@Param("validation_model") Integer validation_model);

	@Query(value = "SELECT SGWPK_ID,SGW_API_MODEL,SGW_API_ATTRIBUTE,CV_FIXTAG,CV_FORMAT,CLIENT_FIXML_PATH,CLIENT_FIXML_FIELD,CLIENT_TECHINCAL_COMMENTS,MAP_FILTER_MODEL,MAP_ROW_TYPE from ABAXX_DATAMODEL where MAP_FILTER_MODEL IN (0,:validation_model)", nativeQuery = true)
	List<ABAXX_DatamodelCV_Client> getABAXX_CVclient(@Param("validation_model") Integer validation_model);

	@Query(value = "SELECT SGWPK_ID,SGW_API_MODEL,SGW_API_ATTRIBUTE,FISCD_SCREEN_NAME,FISCD_DESCRIPTION,CLIENT_AE_TAG, CLIENT_AE_FIELD, CLIENT_AE_DESCRIPTION,CLIENT_TECHINCAL_COMMENTS,MAP_FILTER_MODEL,MAP_ROW_TYPE from ABAXX_DATAMODEL where MAP_FILTER_MODEL IN (0,:validation_model)", nativeQuery = true)
	List<ABAXX_DatamodelFISCD_Client> getABAXX_FISCDclient(@Param("validation_model") Integer validation_model);

	@Query(value = "SELECT SGWPK_ID,SGW_API_MODEL,SGW_API_ATTRIBUTE,SGW_API_ISMANDATORY,SGW_API_TYPE,SGW_API_FUNCT_DESC,SGW_API_IMPL_DESC,SGW_API_INTERNAL_FLEXI,FISCD_FUNCTIONAL_NAME,FISCD_SCREEN_NAME,FISCD_DESCRIPTION,FISCD_DTO_ATTRIBUTE,FISCD_FORMAT,FISCD_TYPE,FISCD_ISMANDATORY,CLIENT_AE_TAG, CLIENT_AE_FIELD, CLIENT_AE_DESCRIPTION,CLIENT_TECHINCAL_COMMENTS,MAP_FILTER_MODEL,MAP_ROW_TYPE from ABAXX_DATAMODEL where MAP_FILTER_MODEL IN (0,:validation_model)", nativeQuery = true)
	List<ABAXX_DatamodelFISCD_Full> getABAXX_FISCDInternalfull(@Param("validation_model") Integer validation_model);

}
