package com.fis.demo.abaxx.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface ABAXX_DatamodelFISCD_Client {
	@JsonProperty("SGW_Model")
	public String getSGW_API_MODEL();

	@JsonProperty("SGW_Attribute")
	public String getSGW_API_ATTRIBUTE();

	@JsonProperty("FISCD_SCREEN_NAME")
	public String getFISCD_SCREEN_NAME();

	@JsonProperty("FISCD_DESCRIPTION")
	public String getFISCD_DESCRIPTION();

	@JsonProperty("AE_TAG")
	public String getCLIENT_AE_TAG();

	public String getCLIENT_AE_FIELD();

	@JsonProperty("AE_DESCRIPTION")
	public String getCLIENT_AE_DESCRIPTION();

	@JsonProperty("Technical_Comments")
	public String getCLIENT_TECHNICAL_COMMENTS();
}
