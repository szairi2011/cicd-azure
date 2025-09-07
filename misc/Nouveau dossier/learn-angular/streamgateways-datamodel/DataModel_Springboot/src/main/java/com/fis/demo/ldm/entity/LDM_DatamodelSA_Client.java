package com.fis.demo.ldm.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface LDM_DatamodelSA_Client {
	
	@JsonProperty("ID")
	public Integer getSGWPK_ID();
	
	@JsonProperty("SGW_Model")
	public String getSGW_API_MODEL();
	
	@JsonProperty("SGW_Attribute")
	public String getSGW_API_ATTRIBUTE();

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
