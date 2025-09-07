package com.fis.demo.ldm;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fis.demo.exception.NotSupportedException;
import com.fis.demo.exception.ResourceNotFoundException;
import com.fis.demo.ldm.entity.LDM_DATAMODEL;
import com.fis.demo.ldm.entity.LDM_DatamodelCV_Client;
import com.fis.demo.ldm.entity.LDM_DatamodelCV_Full;
import com.fis.demo.ldm.entity.LDM_DatamodelFISCD_Client;
import com.fis.demo.ldm.entity.LDM_DatamodelFISCD_Full;
import com.fis.demo.ldm.entity.LDM_DatamodelSA_Client;
import com.fis.demo.ldm.entity.LDM_DatamodelSA_Full;

@CrossOrigin
@RestController
@RequestMapping("/datamodel/middleoffice/LDM")
public class LdmDatamodelController {

	@Autowired
	LdmDatamodelService LdmDatamodelService;

	@GetMapping(path = "/SA/internalfull/{validation_model}")
	public ResponseEntity<List<LDM_DatamodelSA_Full>> getSA_fullDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		List<LDM_DatamodelSA_Full> result = null;
		result = LdmDatamodelService.getSAInternalfull(validation_model);
		return new ResponseEntity<List<LDM_DatamodelSA_Full>>(result, HttpStatus.OK);
	}

	@GetMapping(path = "/SA/client/{validation_model}")
	public ResponseEntity<List<LDM_DatamodelSA_Client>> getSA_ClientDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		List<LDM_DatamodelSA_Client> result = null;
		result = LdmDatamodelService.getSAclient(validation_model);
		return new ResponseEntity<List<LDM_DatamodelSA_Client>>(result, HttpStatus.OK);
	}

	@GetMapping(path = "/CV/internalfull/{validation_model}")
	public ResponseEntity<List<LDM_DatamodelCV_Full>> getCV_fullDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		List<LDM_DatamodelCV_Full> result = null;
		result = LdmDatamodelService.getCVInternalfull(validation_model);
		return new ResponseEntity<List<LDM_DatamodelCV_Full>>(result, HttpStatus.OK);
	}

	@GetMapping(path = "/CV/client/{validation_model}")
	public ResponseEntity<List<LDM_DatamodelCV_Client>> getCV_ClientDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		List<LDM_DatamodelCV_Client> result = null;
		result = LdmDatamodelService.getCVclient(validation_model);
		return new ResponseEntity<List<LDM_DatamodelCV_Client>>(result, HttpStatus.OK);
	}

	@GetMapping(path = "/FISCD/internalfull/{validation_model}")
	public ResponseEntity<List<LDM_DatamodelFISCD_Full>> getFISCD_fullDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		System.out.println("Not supported");
		throw new NotSupportedException("Not supported");
	}

	@GetMapping(path = "/FISCD/client/{validation_model}")
	public ResponseEntity<List<LDM_DatamodelFISCD_Client>> getFISCD_ClientDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		System.out.println("Not supported");
		throw new NotSupportedException("Not supported");
	}

	// Return full datamodel table
	@GetMapping(path = "/full")
	public ResponseEntity<List<LDM_DATAMODEL>> getfullDataModel() {
		List<LDM_DATAMODEL> result = null;
		result = LdmDatamodelService.getfullMapping();
		return new ResponseEntity<List<LDM_DATAMODEL>>(result, HttpStatus.OK);
	}

	@PostMapping(path = "")
	public ResponseEntity<Boolean> createNewDataModelEntry(@RequestBody LDM_DATAMODEL dataModel_Table) {
		System.out.println("Creating new NewDataModelEntry");

		if (dataModel_Table.getSGWPK_ID() != null) {
			Optional<LDM_DATAMODEL> dataModelObj = LdmDatamodelService.findById(dataModel_Table.getSGWPK_ID());

			if (dataModelObj.isPresent()) {
				System.out.println("Data with id is already present..so skipping it");
				throw new NotSupportedException("data model already present with id:" + dataModel_Table.getSGWPK_ID());

			}
		} else {
			try {
				System.out.println("Adding new NewDataModelEntry");
				LdmDatamodelService.save_DataModel(dataModel_Table);
				return ResponseEntity.ok().build();
			} catch (Exception ex) {
				System.out.println("Not able to Create." + ex.getMessage());
				return ResponseEntity.notFound().build();
			}
		}
		return new ResponseEntity<Boolean>(false, HttpStatus.NOT_ACCEPTABLE);

	}

	@PutMapping(path = "/{modelId}")
	public ResponseEntity<LDM_DATAMODEL> updateDataModelEntry(@PathVariable(value = "modelId") Integer modelId,
			@RequestBody LDM_DATAMODEL new_dataModel_Table) {
		System.out.println("updating NewDataModelEntry");
		Optional<LDM_DATAMODEL> dataModelObj = LdmDatamodelService.findById(modelId);

		if (dataModelObj.isPresent()) {

			LDM_DATAMODEL original_obj = dataModelObj.get();

			LdmDatamodelService.updatedDatmodelColumn(original_obj, new_dataModel_Table);

			LdmDatamodelService.save_DataModel(original_obj);
			System.out.println("updating datamodel successful");
			return ResponseEntity.ok(original_obj);
		} else {
			System.out.println("datamodel object is not present.Updating datamodel failed");
			throw new ResourceNotFoundException("Datamodel not found with id:" + modelId);
		}

	}

	@DeleteMapping(path = "/{modelId}")
	public ResponseEntity<Boolean> deleteDataModelByID(@PathVariable(value = "modelId") int modelId) {
		try {
			System.out.println("Deleting ModelId : " + modelId);
			LdmDatamodelService.deleteById(modelId);
			return ResponseEntity.ok().build();
		} catch (ResourceNotFoundException ex) {
			System.out.println("Not able to delete ModelId : " + modelId + "Error" + ex.getMessage());
			return ResponseEntity.notFound().build();
		}
	}
}
