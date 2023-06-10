package kh.coded.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.AddressCoordDTO;
import kh.coded.repositories.AddressCoordDAO;

@Service
public class AddressCoordService {
	@Autowired
	private AddressCoordDAO addressCoordDAO;
	
	public AddressCoordDTO getAddressCoord(String address1, String address2) {
		return addressCoordDAO.selectByAddresses(address1, address2);
	}
}
