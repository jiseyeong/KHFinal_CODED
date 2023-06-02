package kh.coded.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kh.coded.dto.MoviesDTO;
import kh.coded.repositories.MoviesDAO;

@Service
public class MoviesService {
	@Autowired
	private MoviesDAO moviesDAO;
	
	public List<MoviesDTO> selectAll(){
		return moviesDAO.selectAll();
	}
}
