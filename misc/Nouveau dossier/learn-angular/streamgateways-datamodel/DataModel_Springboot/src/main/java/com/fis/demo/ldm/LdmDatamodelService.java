package com.fis.demo.ldm;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fis.demo.ldm.entity.LDM_DATAMODEL;
import com.fis.demo.ldm.entity.LDM_DatamodelCV_Client;
import com.fis.demo.ldm.entity.LDM_DatamodelCV_Full;
import com.fis.demo.ldm.entity.LDM_DatamodelFISCD_Client;
import com.fis.demo.ldm.entity.LDM_DatamodelFISCD_Full;
import com.fis.demo.ldm.entity.LDM_DatamodelSA_Client;
import com.fis.demo.ldm.entity.LDM_DatamodelSA_Full;

@Service
public class LdmDatamodelService {

	@Autowired
	LdmRepository ldmRepository;

	public List<LDM_DATAMODEL> getfullMapping() {
		return ldmRepository.findAll();
	}

	public List<LDM_DatamodelSA_Full> getSAInternalfull(Integer validation_model) {
		return ldmRepository.getLDM_SAFull(validation_model);
	}

	public List<LDM_DatamodelSA_Client> getSAclient(Integer validation_model) {
		return ldmRepository.getLDM_SAclient(validation_model);
	}

	public List<LDM_DatamodelCV_Full> getCVInternalfull(Integer validation_model) {
		return ldmRepository.getLDM_CVFull(validation_model);
	}

	public List<LDM_DatamodelCV_Client> getCVclient(Integer validation_model) {
		return ldmRepository.getLDM_CVclient(validation_model);

	}

	public List<LDM_DatamodelFISCD_Full> getFISCDInternalfull(Integer validation_model) {
		return null;
	}

	public List<LDM_DatamodelFISCD_Client> getFISCDclient(Integer validation_model) {
		return null;
	}

	public void save_DataModel(LDM_DATAMODEL d) {
		ldmRepository.save(d);
	}

	public Optional<LDM_DATAMODEL> findById(int id) {
		return ldmRepository.findById(id);
	}

	public void deleteById(int modelId) {
		ldmRepository.deleteById(modelId);
	}

	public void updatedDatmodelColumn(LDM_DATAMODEL original_obj, LDM_DATAMODEL new_dataModel_Table) {

		if (null != new_dataModel_Table.getSGW_API_MODEL()) {
			if (original_obj.getSGW_API_MODEL() != new_dataModel_Table.getSGW_API_MODEL()) {
				original_obj.setSGW_API_MODEL(new_dataModel_Table.getSGW_API_MODEL());
			}
		}

		if (null != new_dataModel_Table.getSGW_API_ATTRIBUTE()) {
			if (original_obj.getSGW_API_ATTRIBUTE() != new_dataModel_Table.getSGW_API_ATTRIBUTE()) {
				original_obj.setSGW_API_ATTRIBUTE(new_dataModel_Table.getSGW_API_ATTRIBUTE());
			}
		}

		if (null != new_dataModel_Table.getSGW_API_TYPE()) {
			if (original_obj.getSGW_API_TYPE() != new_dataModel_Table.getSGW_API_TYPE()) {
				original_obj.setSGW_API_TYPE(new_dataModel_Table.getSGW_API_TYPE());
			}
		}

		if (null != new_dataModel_Table.getSGW_API_ISMANDATORY()) {
			if (original_obj.getSGW_API_ISMANDATORY() != new_dataModel_Table.getSGW_API_ISMANDATORY()) {
				original_obj.setSGW_API_ISMANDATORY(new_dataModel_Table.getSGW_API_ISMANDATORY());
			}
		}

		if (null != new_dataModel_Table.getSGW_API_FUNCT_DESC()) {
			if (original_obj.getSGW_API_FUNCT_DESC() != new_dataModel_Table.getSGW_API_FUNCT_DESC()) {
				original_obj.setSGW_API_FUNCT_DESC(new_dataModel_Table.getSGW_API_FUNCT_DESC());
			}
		}

		if (null != new_dataModel_Table.getSGW_API_IMPL_DESC()) {
			if (original_obj.getSGW_API_IMPL_DESC() != new_dataModel_Table.getSGW_API_IMPL_DESC()) {
				original_obj.setSGW_API_IMPL_DESC(new_dataModel_Table.getSGW_API_IMPL_DESC());
			}
		}

		if (null != new_dataModel_Table.getSGW_API_INTERNAL_FLEXI()) {
			if (original_obj.getSGW_API_INTERNAL_FLEXI() != new_dataModel_Table.getSGW_API_INTERNAL_FLEXI()) {
				original_obj.setSGW_API_INTERNAL_FLEXI(new_dataModel_Table.getSGW_API_INTERNAL_FLEXI());
			}
		}

		// -----------CV
		if (null != new_dataModel_Table.getCV_CURRENT_CONSTRAINTS()) {
			if (original_obj.getCV_CURRENT_CONSTRAINTS() != new_dataModel_Table.getCV_CURRENT_CONSTRAINTS()) {
				original_obj.setCV_CURRENT_CONSTRAINTS(new_dataModel_Table.getCV_CURRENT_CONSTRAINTS());
			}
		}

		if (null != new_dataModel_Table.getCV_FIX_RULES()) {
			if (original_obj.getCV_FIX_RULES() != new_dataModel_Table.getCV_FIX_RULES()) {
				original_obj.setCV_FIX_RULES(new_dataModel_Table.getCV_FIX_RULES());
			}
		}

		if (null != new_dataModel_Table.getCV_CV_AUDIT()) {
			if (original_obj.getCV_CV_AUDIT() != new_dataModel_Table.getCV_CV_AUDIT()) {
				original_obj.setCV_CV_AUDIT(new_dataModel_Table.getCV_CV_AUDIT());
			}
		}

		if (null != new_dataModel_Table.getCV_MARKETWATCH()) {
			if (original_obj.getCV_MARKETWATCH() != new_dataModel_Table.getCV_MARKETWATCH()) {
				original_obj.setCV_MARKETWATCH(new_dataModel_Table.getCV_MARKETWATCH());
			}
		}

		if (null != new_dataModel_Table.getCV_FIXTAG()) {
			if (original_obj.getCV_FIXTAG() != new_dataModel_Table.getCV_FIXTAG()) {
				original_obj.setCV_FIXTAG(new_dataModel_Table.getCV_FIXTAG());
			}
		}

		if (null != new_dataModel_Table.getCV_FIXTAG_NAME()) {
			if (original_obj.getCV_FIXTAG_NAME() != new_dataModel_Table.getCV_FIXTAG_NAME()) {
				original_obj.setCV_FIXTAG_NAME(new_dataModel_Table.getCV_FIXTAG_NAME());
			}
		}

		if (null != new_dataModel_Table.getCV_FORMAT()) {
			if (original_obj.getCV_FORMAT() != new_dataModel_Table.getCV_FORMAT()) {
				original_obj.setCV_FORMAT(new_dataModel_Table.getCV_FORMAT());
			}
		}

		// -----------SA
		if (null != new_dataModel_Table.getSA_FIXML_MAPPING()) {
			if (original_obj.getSA_FIXML_MAPPING() != new_dataModel_Table.getSA_FIXML_MAPPING()) {
				original_obj.setSA_FIXML_MAPPING(new_dataModel_Table.getSA_FIXML_MAPPING());
			}
		}

		if (null != new_dataModel_Table.getSA_FORMAT()) {
			if (original_obj.getSA_FORMAT() != new_dataModel_Table.getSA_FORMAT()) {
				original_obj.setSA_FORMAT(new_dataModel_Table.getSA_FORMAT());
			}
		}

		// -----------client
		if (null != new_dataModel_Table.getCLIENT_FIXML_PATH()) {
			if (original_obj.getCLIENT_FIXML_PATH() != new_dataModel_Table.getCLIENT_FIXML_PATH()) {
				original_obj.setCLIENT_FIXML_PATH(new_dataModel_Table.getCLIENT_FIXML_PATH());
			}
		}

		if (null != new_dataModel_Table.getCLIENT_FIXML_FIELD()) {
			if (original_obj.getCLIENT_FIXML_FIELD() != new_dataModel_Table.getCLIENT_FIXML_FIELD()) {
				original_obj.setCLIENT_FIXML_FIELD(new_dataModel_Table.getCLIENT_FIXML_FIELD());
			}
		}

		if (null != new_dataModel_Table.getCLIENT_TECHINCAL_COMMENTS()) {
			if (original_obj.getCLIENT_TECHINCAL_COMMENTS() != new_dataModel_Table.getCLIENT_TECHINCAL_COMMENTS()) {
				original_obj.setCLIENT_TECHINCAL_COMMENTS(new_dataModel_Table.getCLIENT_TECHINCAL_COMMENTS());
			}
		}

		// ---- App internals
		if (null != new_dataModel_Table.getMAP_FILTER_MODEL()) {
			if (original_obj.getMAP_FILTER_MODEL() != new_dataModel_Table.getMAP_FILTER_MODEL()) {
				original_obj.setMAP_FILTER_MODEL(new_dataModel_Table.getMAP_FILTER_MODEL());
			}
		}

		if (null != new_dataModel_Table.getMAP_ROW_TYPE()) {
			if (original_obj.getMAP_ROW_TYPE() != new_dataModel_Table.getMAP_ROW_TYPE()) {
				original_obj.setMAP_ROW_TYPE(new_dataModel_Table.getMAP_ROW_TYPE());
			}
		}
	}
}
