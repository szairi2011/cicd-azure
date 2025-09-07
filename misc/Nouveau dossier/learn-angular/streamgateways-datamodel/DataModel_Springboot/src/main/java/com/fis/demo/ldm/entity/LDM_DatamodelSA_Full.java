package com.fis.demo.ldm.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface LDM_DatamodelSA_Full {

	@JsonProperty("ID")
	public Integer getSGWPK_ID();

	@JsonProperty("SGW_Model")
	public String getSGW_API_MODEL();

	@JsonProperty("SGW_Attribute")
	public String getSGW_API_ATTRIBUTE();

	@JsonProperty("SGW_Type")
	public String getSGW_API_TYPE();

	@JsonProperty("Mandatory")
	public String getSGW_API_ISMANDATORY();

	@JsonProperty("Functional_Description")
	public String getSGW_API_FUNCT_DESC();

	@JsonProperty("Impl_Description")
	public String getSGW_API_IMPL_DESC();

	@JsonProperty("Internal_Flexible")
	public String getSGW_API_INTERNAL_FLEXI();

	@JsonProperty("SA_FIXML_Mapping")
	public String getSA_FIXML_MAPPING();

	@JsonProperty("SA_Format")
	public String getSA_FORMAT();

	@JsonProperty("FIXML_Path")
	public String getCLIENT_FIXML_PATH();

	@JsonProperty("FIXML_Field")
	public String getCLIENT_FIXML_FIELD();

	@JsonProperty("Technical_Comments")
	public String getCLIENT_TECHINCAL_COMMENTS();

	@JsonProperty("Filter_Model")
	public Integer getMAP_FILTER_MODEL();

	@JsonProperty("Row_Type")
	public Integer getMAP_ROW_TYPE();

}
