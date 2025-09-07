package com.fis.demo.abaxx;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fis.demo.abaxx.entity.ABAXX_DATAMODEL;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelCV_Client;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelCV_Full;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelFISCD_Client;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelFISCD_Full;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelSA_Client;
import com.fis.demo.abaxx.entity.ABAXX_DatamodelSA_Full;
import com.fis.demo.exception.ResourceNotFoundException;

@RestController
@RequestMapping("/datamodel/middleoffice/ABAXX")
public class AbaxxDatamodelController {

	@Autowired
	AbaxxDatamodelService abaxxDatamodelService;

	@GetMapping(path = "/SA/internalfull/{validation_model}")
	public ResponseEntity<List<ABAXX_DatamodelSA_Full>> getSA_fullDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		List<ABAXX_DatamodelSA_Full> result = null;
		result = abaxxDatamodelService.getSAInternalfull(validation_model);
		return new ResponseEntity<List<ABAXX_DatamodelSA_Full>>(result, HttpStatus.OK);
	}

	@GetMapping(path = "/SA/client/{validation_model}")
	public ResponseEntity<List<ABAXX_DatamodelSA_Client>> getSA_ClientDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		List<ABAXX_DatamodelSA_Client> result = null;
		result = abaxxDatamodelService.getSAclient(validation_model);
		return new ResponseEntity<List<ABAXX_DatamodelSA_Client>>(result, HttpStatus.OK);
	}

	@GetMapping(path = "/CV/internalfull/{validation_model}")
	public ResponseEntity<List<ABAXX_DatamodelCV_Full>> getCV_fullDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		List<ABAXX_DatamodelCV_Full> result = null;
		result = abaxxDatamodelService.getCVInternalfull(validation_model);
		return new ResponseEntity<List<ABAXX_DatamodelCV_Full>>(result, HttpStatus.OK);
	}

	@GetMapping(path = "/CV/client/{validation_model}")
	public ResponseEntity<List<ABAXX_DatamodelCV_Client>> getCV_ClientDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		List<ABAXX_DatamodelCV_Client> result = null;
		result = abaxxDatamodelService.getCVclient(validation_model);
		return new ResponseEntity<List<ABAXX_DatamodelCV_Client>>(result, HttpStatus.OK);
	}

	@GetMapping(path = "/FISCD/internalfull/{validation_model}")
	public ResponseEntity<List<ABAXX_DatamodelFISCD_Full>> getFISCD_fullDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		List<ABAXX_DatamodelFISCD_Full> result = null;
		result = abaxxDatamodelService.getFISCDInternalfull(validation_model);
		return new ResponseEntity<List<ABAXX_DatamodelFISCD_Full>>(result, HttpStatus.OK);
	}

	@GetMapping(path = "/FISCD/client/{validation_model}")
	public ResponseEntity<List<ABAXX_DatamodelFISCD_Client>> getFISCD_ClientDataModel(
			@PathVariable(value = "validation_model") Integer validation_model) {
		List<ABAXX_DatamodelFISCD_Client> result = null;
		result = abaxxDatamodelService.getFISCDclient(validation_model);
		return new ResponseEntity<List<ABAXX_DatamodelFISCD_Client>>(result, HttpStatus.OK);
	}

	@GetMapping(path = "/full")
	public ResponseEntity<List<ABAXX_DATAMODEL>> getCVDataModel() {
		List<ABAXX_DATAMODEL> result = null;
		result = abaxxDatamodelService.getfullMapping();
		return new ResponseEntity<List<ABAXX_DATAMODEL>>(result, HttpStatus.OK);
	}

	@PostMapping(path = "")
	public ResponseEntity<Boolean> createNewDataModelEntry(@RequestBody ABAXX_DATAMODEL dataModel_Table) {
		System.out.println("Creating new NewDataModelEntry");
		try {
			abaxxDatamodelService.saveDataModel(dataModel_Table);
			return ResponseEntity.ok().build();
		} catch (Exception ex) {
			System.out.println("Not able to Create." + ex.getMessage());
			return ResponseEntity.notFound().build();
		}

	}

	@PutMapping(path = "/{modelId}")
	public ResponseEntity<ABAXX_DATAMODEL> updateDataModelEntry(@PathVariable(value = "modelId") Integer ModelId,
			@RequestBody ABAXX_DATAMODEL new_dataModel_Table) {
		System.out.println("updating NewDataModelEntry");
		Optional<ABAXX_DATAMODEL> dataModelObj = abaxxDatamodelService.findById(ModelId);

		if (dataModelObj.isPresent()) {
			ABAXX_DATAMODEL original_obj = dataModelObj.get();

			abaxxDatamodelService.updatedDatmodelColumn(original_obj, new_dataModel_Table);

			abaxxDatamodelService.saveDataModel(original_obj);
			System.out.println("updating datamodel successful");
			return ResponseEntity.ok(original_obj);
		} else {
			System.out.println("datamodel object is not present.Updating datamodel failed");
			throw new ResourceNotFoundException();
		}

	}

	@DeleteMapping(path = "/{modelId}")
	public ResponseEntity<Boolean> deleteDataModelByID(@PathVariable(value = "modelId") int modelId) {
		try {
			System.out.println("Deleting ModelId : " + modelId);
			abaxxDatamodelService.deleteById(modelId);
			return ResponseEntity.ok().build();
		} catch (ResourceNotFoundException ex) {
			System.out.println("Not able to delete ModelId : " + modelId + "Error" + ex.getMessage());
			return ResponseEntity.notFound().build();
		}
	}
}
