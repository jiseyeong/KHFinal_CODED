package kh.coded.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kh.coded.dto.MoviesDTO;
import kh.coded.services.MoviesService;

@Controller
public class TestController {
	
	@Autowired
	private MoviesService moviesService;
	
	@ResponseBody
	@GetMapping("/")
	public List<MoviesDTO> test() {
		for(MoviesDTO dto : moviesService.selectAll()) {
			System.out.println(dto.getId() +" : "+ dto.getTitle() +" : "+ dto.getGenre());
		}
		return moviesService.selectAll();
	}
}
