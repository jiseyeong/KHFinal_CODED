package kh.coded.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.repositories.AddressCoordDAO;

@Service
public class WetherService {
	@Autowired
	private AddressCoordDAO addressCoordDAO;
	
	
}
