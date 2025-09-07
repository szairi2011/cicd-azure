package com.fis.demo.ldm.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface LDM_DatamodelCV_Full {

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

	@JsonProperty("CV_Constraints")
	public String getCV_CURRENT_CONSTRAINTS();

	@JsonProperty("CV_Fix_Rules")
	public String getCV_FIX_RULES();

	@JsonProperty("CV_Audit")
	public String getCV_CV_AUDIT();

	@JsonProperty("CV_MarketWatch")
	public String getCV_MARKETWATCH();

	@JsonProperty("CV_FixTag")
	public String getCV_FIXTAG();

	@JsonProperty("CV_FixTagName")
	public String getCV_FIXTAG_NAME();

	@JsonProperty("CV_Format")
	public String getCV_FORMAT();

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
