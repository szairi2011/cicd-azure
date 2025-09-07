package com.fis.demo.ldm.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table
@DynamicUpdate
public class LDM_DATAMODEL {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_seq_gen_LDM")
	@SequenceGenerator(name = "my_seq_gen_LDM", sequenceName = "GEN_SEQUENCE_LDM", allocationSize = 1 ,initialValue = 333)
	@Column(name = "SGWPK_ID", updatable = false)
	Integer SGWPK_ID;

	@Column(nullable = true)
	String SGW_API_MODEL;

	@Column(nullable = true)
	String SGW_API_ATTRIBUTE;

	@Column(nullable = true)
	String SGW_API_TYPE;

	@Column(nullable = true)
	String SGW_API_ISMANDATORY;

	@Column(nullable = true)
	String SGW_API_FUNCT_DESC;

	@Column(nullable = true)
	String SGW_API_IMPL_DESC;

	@Column(nullable = true)
	String SGW_API_INTERNAL_FLEXI;

	@Column(nullable = true)
	String CV_CURRENT_CONSTRAINTS;

	@Column(nullable = true)
	String CV_FIX_RULES;

	@Column(nullable = true)
	String CV_CV_AUDIT;

	@Column(nullable = true)
	String CV_MARKETWATCH;

	@Column(nullable = true)
	String CV_FIXTAG;

	@Column(nullable = true)
	String CV_FIXTAG_NAME;

	@Column(nullable = true)
	String CV_FORMAT;

	@Column(nullable = true)
	String SA_FIXML_MAPPING;

	@Column(nullable = true)
	String SA_FORMAT;

	@Column(nullable = true)
	String CLIENT_FIXML_PATH;

	@Column(nullable = true)
	String CLIENT_FIXML_FIELD;

	@Column(nullable = true)
	String CLIENT_TECHINCAL_COMMENTS;

	@Column(nullable = false)
	Integer MAP_FILTER_MODEL;

	@Column(nullable = false)
	Integer MAP_ROW_TYPE;

	public LDM_DATAMODEL() {

	}

	public LDM_DATAMODEL(String sGW_API_MODEL, String sGW_API_ATTRIBUTE, String sGW_API_TYPE,
			String sGW_API_ISMANDATORY, String sGW_API_FUNCT_DESC, String sGW_API_IMPL_DESC,
			String sGW_API_INTERNAL_FLEXI, String cV_CURRENT_CONSTRAINTS, String cV_FIX_RULES, String cV_CV_AUDIT,
			String cV_MARKETWATCH, String cV_FIXTAG, String cV_FIXTAG_NAME, String cV_FORMAT, String sA_FIXML_MAPPING,
			String sA_FORMAT, String cLIENT_FIXML_PATH, String cLIENT_FIXML_FIELD, String cLIENT_TECHINCAL_COMMENTS,
			Integer mAP_FILTER_MODEL, Integer mAP_ROW_TYPE) {
		super();
		SGW_API_MODEL = sGW_API_MODEL;
		SGW_API_ATTRIBUTE = sGW_API_ATTRIBUTE;
		SGW_API_TYPE = sGW_API_TYPE;
		SGW_API_ISMANDATORY = sGW_API_ISMANDATORY;
		SGW_API_FUNCT_DESC = sGW_API_FUNCT_DESC;
		SGW_API_IMPL_DESC = sGW_API_IMPL_DESC;
		SGW_API_INTERNAL_FLEXI = sGW_API_INTERNAL_FLEXI;
		CV_CURRENT_CONSTRAINTS = cV_CURRENT_CONSTRAINTS;
		CV_FIX_RULES = cV_FIX_RULES;
		CV_CV_AUDIT = cV_CV_AUDIT;
		CV_MARKETWATCH = cV_MARKETWATCH;
		CV_FIXTAG = cV_FIXTAG;
		CV_FIXTAG_NAME = cV_FIXTAG_NAME;
		CV_FORMAT = cV_FORMAT;
		SA_FIXML_MAPPING = sA_FIXML_MAPPING;
		SA_FORMAT = sA_FORMAT;
		CLIENT_FIXML_PATH = cLIENT_FIXML_PATH;
		CLIENT_FIXML_FIELD = cLIENT_FIXML_FIELD;
		CLIENT_TECHINCAL_COMMENTS = cLIENT_TECHINCAL_COMMENTS;
		MAP_FILTER_MODEL = mAP_FILTER_MODEL;
		MAP_ROW_TYPE = mAP_ROW_TYPE;
	}

	
	public void setSGWPK_ID(Integer sGWPK_ID) {
		SGWPK_ID = sGWPK_ID;
	}

	@JsonProperty("SGW_Model")
	public String getSGW_API_MODEL() {
		return SGW_API_MODEL;
	}

	public void setSGW_API_MODEL(String sGW_API_MODEL) {
		SGW_API_MODEL = sGW_API_MODEL;
	}

	@JsonProperty("SGW_Attribute")
	public String getSGW_API_ATTRIBUTE() {
		return SGW_API_ATTRIBUTE;
	}

	public void setSGW_API_ATTRIBUTE(String sGW_API_ATTRIBUTE) {
		SGW_API_ATTRIBUTE = sGW_API_ATTRIBUTE;
	}

	@JsonProperty("SGW_Type")
	public String getSGW_API_TYPE() {
		return SGW_API_TYPE;
	}

	public void setSGW_API_TYPE(String sGW_API_TYPE) {
		SGW_API_TYPE = sGW_API_TYPE;
	}

	@JsonProperty("Mandatory")
	public String getSGW_API_ISMANDATORY() {
		return SGW_API_ISMANDATORY;
	}

	public void setSGW_API_ISMANDATORY(String sGW_API_ISMANDATORY) {
		SGW_API_ISMANDATORY = sGW_API_ISMANDATORY;
	}

	@JsonProperty("Functional_Description")
	public String getSGW_API_FUNCT_DESC() {
		return SGW_API_FUNCT_DESC;
	}

	public void setSGW_API_FUNCT_DESC(String sGW_API_FUNCT_DESC) {
		SGW_API_FUNCT_DESC = sGW_API_FUNCT_DESC;
	}

	@JsonProperty("Impl_Description")
	public String getSGW_API_IMPL_DESC() {
		return SGW_API_IMPL_DESC;
	}

	public void setSGW_API_IMPL_DESC(String sGW_API_IMPL_DESC) {
		SGW_API_IMPL_DESC = sGW_API_IMPL_DESC;
	}

	@JsonProperty("Internal_Flexible")
	public String getSGW_API_INTERNAL_FLEXI() {
		return SGW_API_INTERNAL_FLEXI;
	}

	public void setSGW_API_INTERNAL_FLEXI(String sGW_API_INTERNAL_FLEXI) {
		SGW_API_INTERNAL_FLEXI = sGW_API_INTERNAL_FLEXI;
	}

	@JsonProperty("CV_Constraints")
	public String getCV_CURRENT_CONSTRAINTS() {
		return CV_CURRENT_CONSTRAINTS;
	}

	public void setCV_CURRENT_CONSTRAINTS(String cV_CURRENT_CONSTRAINTS) {
		CV_CURRENT_CONSTRAINTS = cV_CURRENT_CONSTRAINTS;
	}

	@JsonProperty("CV_Fix_Rules")
	public String getCV_FIX_RULES() {
		return CV_FIX_RULES;
	}

	public void setCV_FIX_RULES(String cV_FIX_RULES) {
		CV_FIX_RULES = cV_FIX_RULES;
	}

	@JsonProperty("CV_Audit")
	public String getCV_CV_AUDIT() {
		return CV_CV_AUDIT;
	}

	public void setCV_CV_AUDIT(String cV_CV_AUDIT) {
		CV_CV_AUDIT = cV_CV_AUDIT;
	}

	@JsonProperty("CV_MarketWatch")
	public String getCV_MARKETWATCH() {
		return CV_MARKETWATCH;
	}

	public void setCV_MARKETWATCH(String cV_MARKETWATCH) {
		CV_MARKETWATCH = cV_MARKETWATCH;
	}

	@JsonProperty("CV_FixTag")
	public String getCV_FIXTAG() {
		return CV_FIXTAG;
	}

	public void setCV_FIXTAG(String cV_FIXTAG) {
		CV_FIXTAG = cV_FIXTAG;
	}

	@JsonProperty("CV_FixTagName")
	public String getCV_FIXTAG_NAME() {
		return CV_FIXTAG_NAME;
	}

	public void setCV_FIXTAG_NAME(String cV_FIXTAG_NAME) {
		CV_FIXTAG_NAME = cV_FIXTAG_NAME;
	}

	@JsonProperty("CV_Format")
	public String getCV_FORMAT() {
		return CV_FORMAT;
	}

	public void setCV_FORMAT(String cV_FORMAT) {
		CV_FORMAT = cV_FORMAT;
	}

	@JsonProperty("SA_FIXML_Mapping")
	public String getSA_FIXML_MAPPING() {
		return SA_FIXML_MAPPING;
	}

	public void setSA_FIXML_MAPPING(String sA_FIXML_MAPPING) {
		SA_FIXML_MAPPING = sA_FIXML_MAPPING;
	}

	@JsonProperty("SA_Format")
	public String getSA_FORMAT() {
		return SA_FORMAT;
	}

	public void setSA_FORMAT(String sA_FORMAT) {
		SA_FORMAT = sA_FORMAT;
	}

	@JsonProperty("FIXML_Path")
	public String getCLIENT_FIXML_PATH() {
		return CLIENT_FIXML_PATH;
	}

	public void setCLIENT_FIXML_PATH(String cLIENT_FIXML_PATH) {
		CLIENT_FIXML_PATH = cLIENT_FIXML_PATH;
	}

	@JsonProperty("FIXML_Field")
	public String getCLIENT_FIXML_FIELD() {
		return CLIENT_FIXML_FIELD;
	}

	public void setCLIENT_FIXML_FIELD(String cLIENT_FIXML_FIELD) {
		CLIENT_FIXML_FIELD = cLIENT_FIXML_FIELD;
	}

	@JsonProperty("Technical_Comments")
	public String getCLIENT_TECHINCAL_COMMENTS() {
		return CLIENT_TECHINCAL_COMMENTS;
	}

	public void setCLIENT_TECHINCAL_COMMENTS(String cLIENT_TECHINCAL_COMMENTS) {
		CLIENT_TECHINCAL_COMMENTS = cLIENT_TECHINCAL_COMMENTS;
	}

	@JsonProperty("Filter_Model")
	public Integer getMAP_FILTER_MODEL() {
		return MAP_FILTER_MODEL;
	}

	public void setMAP_FILTER_MODEL(Integer mAP_FILTER_MODEL) {
		MAP_FILTER_MODEL = mAP_FILTER_MODEL;
	}

	@JsonProperty("Row_Type")
	public Integer getMAP_ROW_TYPE() {
		return MAP_ROW_TYPE;
	}

	public void setMAP_ROW_TYPE(Integer mAP_ROW_TYPE) {
		MAP_ROW_TYPE = mAP_ROW_TYPE;
	}

	@JsonProperty("ID")
	public Integer getSGWPK_ID() {
		return SGWPK_ID;
	}

}
