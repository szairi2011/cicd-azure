package com.fis.demo.abaxx.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface ABAXX_DatamodelFISCD_Full {
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

	@JsonProperty("FISCD_SCREEN_NAME")
	public String getFISCD_SCREEN_NAME();

	@JsonProperty("FISCD_DESCRIPTION")
	public String getFISCD_DESCRIPTION();

	@JsonProperty("FISCD_ISMANDATORY")
	public String getFISCD_ISMANDATORY();

	@JsonProperty("FISCD_TYPE")
	public String getFISCD_TYPE();

	@JsonProperty("FISCD_DTO_ATTRIBUTE")
	public String getFISCD_DTO_ATTRIBUTE();

	@JsonProperty("FISCD_FORMAT")
	public String getFISCD_FORMAT();

	@JsonProperty("FISCD_FUNCTIONAL_NAME")
	public String getFISCD_FUNCTIONAL_NAME();

	@JsonProperty("AE_TAG")
	public String getCLIENT_AE_TAG();

	@JsonProperty("AE_FIELD")
	public String getCLIENT_AE_FIELD();

	@JsonProperty("AE_DESCRIPTION")
	public String getCLIENT_AE_DESCRIPTION();

	@JsonProperty("Technical_Comments")
	public String getCLIENT_TECHNICAL_COMMENTS();

	@JsonProperty("Filter_Model")
	public Integer getMAP_FILTER_MODEL();

	@JsonProperty("Row_Type")
	public Integer getMAP_ROW_TYPE();
}
