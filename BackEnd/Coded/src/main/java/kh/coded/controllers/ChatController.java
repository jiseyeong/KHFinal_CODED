package kh.coded.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kh.coded.dto.DMDTO;
import kh.coded.dto.DMRoomDTO;
import kh.coded.dto.DMRoomListDTO;
import kh.coded.dto.DMRoomUserDTO;
import kh.coded.security.JwtProvider;
import kh.coded.services.DMRoomService;
import kh.coded.services.DMRoomUserService;
import kh.coded.services.DMService;


@RestController
@RequestMapping("/DM/")
public class ChatController {



	@Autowired
	private DMRoomService DMRoomService;
	@Autowired
	private DMService DMService;
	@Autowired
	private DMRoomUserService DMRoomUserService;
	@Autowired
	private JwtProvider jwtProvider;

	// -- DM 관련 DB 작업 --

	// UserNo를 통한 DMRoomListDTO(로그인사용자와 대화중인 상대방의 id, nickname, 사진 등) 데이터 얻어오기
	@GetMapping("selectChatList")
	public ResponseEntity<?> selectChatList (@RequestParam(value = "userNo") int userNo){
		System.out.println("채팅 참가자 조회"+userNo);
		try {
			List<DMRoomListDTO> list = DMRoomService.selectByUserNo(userNo);
			System.out.println(list);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	// 채팅방번호를 통한 채팅내역 불러오기
	@GetMapping("selectDMbyRoomid")
	public ResponseEntity<?> selectDMbyRoomid (@RequestParam(value = "roomId") int roomId){
		try {	
			List<DMDTO> list = DMService.selectDMbyRoomid(roomId);
			return ResponseEntity.ok().body(list);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@DeleteMapping("deleteUserDMRoomUser")
	public void deleteUserDMRoomUser (@RequestParam(value = "roomId") int roomId,@RequestParam(value = "userNo") int userNo) {
		DMRoomUserService.deleteUserDMRoomUser(roomId, userNo);
	}
	
	
	//Admin Page용 작업들
	
	@GetMapping("naviInfo")
	public ResponseEntity<?> getNaviInfo(
			@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="cpage", required=false, defaultValue="1") int cpage
			){
		if (authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if (jwtProvider.validateToken(accessToken)) {
				Map<String, Object> data = DMRoomService.getPageNaviList(cpage);
				return ResponseEntity.ok().body(data);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
	}
    
    @GetMapping("pagingList")
    public ResponseEntity<?> getPagingDMRoomList(
    		@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="cpage", required=false, defaultValue="1") int cpage
    		){
    	if (authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if (jwtProvider.validateToken(accessToken)) {
				List<Map<String, Object>> datas = new ArrayList<>();
				List<DMRoomDTO> roomList = DMRoomService.selectPagingList(cpage);
				for(DMRoomDTO room:roomList) {
					Map<String, Object> data = new HashMap<>();
					List<DMRoomUserDTO> userList = DMRoomUserService.selectByRoomId(room.getRoomId());
					data.put("room", room);
					data.put("userList", userList);
					datas.add(data);
				}
				return ResponseEntity.ok().body(datas);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }
    
	@GetMapping("naviInfo/userNo")
	public ResponseEntity<?> getNaviInfoByUserNo(
			@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="cpage", required=false, defaultValue="1") int cpage,
			@RequestParam(value="userNo") int userNo
			){
		if (authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if (jwtProvider.validateToken(accessToken)) {
				Map<String, Object> data = DMRoomService.getPageNaviList(cpage);
				return ResponseEntity.ok().body(data);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
	}
    
    @GetMapping("pagingList/userNo")
    public ResponseEntity<?> getPagingDMRoomList(
    		@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="cpage", required=false, defaultValue="1") int cpage,
			@RequestParam(value="userNo") int userNo
    		){
    	if (authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if (jwtProvider.validateToken(accessToken)) {
				List<Map<String, Object>> datas = new ArrayList<>();
				List<DMRoomUserDTO> targetUserList = DMRoomUserService.selectPagingListByUserNo(userNo, cpage);
				List<DMRoomDTO> roomList = new ArrayList<>();
				for(DMRoomUserDTO user : targetUserList) {
					roomList.add(DMRoomService.selectOneByRoomId(user.getRoomId()));
				}
				for(DMRoomDTO room : roomList) {
					Map<String, Object> data = new HashMap<>();
					List<DMRoomUserDTO> userList = DMRoomUserService.selectByRoomId(room.getRoomId());
					data.put("room", room);
					data.put("userList", userList);
					datas.add(data);
				}
				return ResponseEntity.ok().body(datas);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }
    
    @GetMapping("getRoomByRoomId")
    public ResponseEntity<?> getRoomByRoomId(
    		@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="cpage", required=false, defaultValue="1") int cpage,
			@RequestParam(value="roomId") int roomId
    		){
    	if (authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if (jwtProvider.validateToken(accessToken)) {
				Map<String, Object> data = new HashMap<>();
				DMRoomDTO room = DMRoomService.selectOneByRoomId(roomId);
				if(room == null) {
					return ResponseEntity.ok().body(null);
				}
				List<DMRoomUserDTO> userList = DMRoomUserService.selectByRoomId(room.getRoomId());
				data.put("room", room);
				data.put("userList", userList);
				return ResponseEntity.ok().body(data);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }
    
    @DeleteMapping("deleteRoom")
    public ResponseEntity<?> deleteRoom(
    		@RequestHeader(value="authorization") String authorization,
			@RequestParam(value="roomId") int roomId
    		){
    	if (authorization.length() > 7) {
			String accessToken = authorization.substring("Bearer ".length(), authorization.length());
			if (jwtProvider.validateToken(accessToken)) {
				DMRoomService.deleteRoomByRoomId(roomId);
				return ResponseEntity.ok().body(null);
			}
		}
		return ResponseEntity.badRequest().body("유효하지 않은 헤더입니다.");
    }
}